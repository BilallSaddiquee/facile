const express = require('express');
const app = express();
const pool = require('./dbConfig');
const Redis = require('ioredis');
const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongoUrl);
const redisClient = new Redis();

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
app.post('/users', async (req, res) => {
    const { name, email, password, contact } = req.body;
    try {
      const newUser = await pool.query(
        'INSERT INTO users (name, email, password, contact) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, password, contact]
      );
  
      // Store status code, user ID, and timestamp in Redis
      const statusCode = 200;
      const userId = newUser.rows[0].id;
      const timestamp = new Date().toISOString();
  
      const cacheKey = `user:${userId}`;
      const cacheData = JSON.stringify({ statusCode, userId, timestamp });
  
      await redisClient.setex(cacheKey, 3600, cacheData);
  
      // Store status code, user ID, and timestamp in MongoDB
      await mongoClient.connect();
      const db = mongoClient.db('cache');
      const cacheCollection = db.collection('cache');
  
      await cacheCollection.insertOne({ userId, statusCode, timestamp });
  
      res.json(newUser.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    } finally {
      await mongoClient.close();
      await redisClient.quit();
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
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
