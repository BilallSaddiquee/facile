const express = require('express');
const app = express();
const pool = require('./dbConfig');
const Redis = require('ioredis');
const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://0.0.0.0:27017/';
const mongoClient = new MongoClient(mongoUrl);
const redisClient = new Redis();
var cors = require("cors");
app.use(cors());
// Middleware
app.use(express.json());

// Routes
// Get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific user
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new user
app.post("/login", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (user.rows.length === 0) {
      console.log("Incorrect email or password");
      res.send("Incorrect Email");
      return;
    }

    let match = false
    if(password === user.rows[0].password){
      match=true;
    }
    if (!match) {
      console.log("Incorrect password");
      res.send("Incorrect Password");
      return;
    }

    const statusCode = 200;
    const userId = user.rows[0].id;
    const timestamp = new Date().toISOString();

    // Store cache in Redis
    const cacheKey = `login:${userId}`;
    const cacheData = JSON.stringify({ timestamp, userId, statusCode });

    redisClient.setex(cacheKey, 3600, cacheData, (err, reply) => {
      if (err) {
        console.error('Error storing cache in Redis:', err);
      } else {
        console.log('Cache stored in Redis:', reply);
      }
    });

    // Store cache in MongoDB
    await mongoClient.connect();
    const db = mongoClient.db('cache');
    const cacheCollection = db.collection('cache');

    await cacheCollection.insertOne({ userId, statusCode, timestamp });

    console.log("Successfully logged in");
    res.send("Login");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error" });
  } finally {
    await mongoClient.close();
    redisClient.quit();
  }
});


app.post('/signUp', async (req, res) => {
  const name = req.body.name;
  const contact = req.body.contact_number;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, contact) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, contact]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});
// Update an existing user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, contact } = req.body;
  try {
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3, contact = $4 WHERE id = $5 RETURNING *',
      [name, email, password, contact, id]
    );
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
