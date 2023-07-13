const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const pool = require('./helper/dbConfig');
const Redis = require('ioredis');
const cors = require('cors')
const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(mongoUrl);
const redisClient = new Redis();

// Middleware
app.use(express.json());
app.use(cors());
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


// Sign up
app.post('/signup', async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
    // Check if the email already exists
    const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    let newUser;
    bcrypt.hash(password, 10).then(async (hash) => {
        newUser = await pool.query(
        'INSERT INTO users (name, email, password, contact) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hash, contact]
      );
     res.json(newUser.rows[0]);
  });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new user
app.post("/login", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
console.log(email,password)
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

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) {
      console.log("Incorrect password");
     res.send("Incorrect Password");
      return;
    }


    const statusCode = 200;
    const userId = user.rows[0].id;
    const name = user.rows[0].name;
    const timestamp = new Date().toISOString();

    // Store cache in Redis
    const cacheKey = `login:${userId}`;
    const cacheData = JSON.stringify({ timestamp, userId, statusCode, name });

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

    await cacheCollection.insertOne({ userId, statusCode, timestamp, name });
    console.log("successfully Login")         
      res.send("Login")
  } catch (error) {
    console.error("Login error:", error.message);
    //res.status(500).json({ error: "Server error" });
  } finally {
    //await mongoClient.close();
    //redisClient.quit();
  }
});



// Endpoint to create a new workspace
app.post('/workspaces', async (req, res) => {
  try {
    const { name, description, adminId } = req.body;

    // Check if the workspace already exists
    const checkQuery = 'SELECT id FROM workspace WHERE name = $1';
    const checkValues = [name];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rowCount > 0) {
      // Workspace with the same name already exists
      res.status(409).json({ message: 'Workspace with the same name already exists' });
      return;
    }

    // Insert the workspace into the "workspace" table
    const insertQuery = 'INSERT INTO workspace (name, description, admin_id) VALUES ($1, $2, $3) RETURNING id';
    const insertValues = [name, description, adminId];

    const result = await pool.query(insertQuery, insertValues);

    const newWorkspaceId = result.rows[0].id;

    res.status(201).json({ message: 'Workspace created successfully', workspaceId: newWorkspaceId, adminId });
  } catch (error) {
    console.error('Error creating workspace:', error);
    res.status(500).json({ message: 'Error creating workspace' });
  }
});



// Endpoint to create a new channel
app.post('/channels', async (req, res) => {
  try {
    const { name, description, wsId } = req.body;

    // Check if the channel already exists
    const checkQuery = 'SELECT id FROM channel WHERE name = $1';
    const checkValues = [name];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rowCount > 0) {
      // Channel with the same name already exists
      res.status(409).json({ message: 'Channel with the same name already exists' });
      return;
    }

    // Insert the channel into the "channel" table
    const insertQuery = 'INSERT INTO channel (name, description, ws_id) VALUES ($1, $2, $3) RETURNING id';
    const insertValues = [name, description, wsId];

    const result = await pool.query(insertQuery, insertValues);

    const newChannelId = result.rows[0].id;

    res.status(201).json({ message: 'Channel created successfully', channelId: newChannelId });
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ message: 'Error creating channel' });
  }
});


// Endpoint to add a new co-worker
app.post('/co-workers', async (req, res) => {
  try {
    const { email, name, password, workspaceIds } = req.body;

    // Check if the co-worker already exists
    const checkQuery = 'SELECT id FROM co_workers WHERE email = $1';
    const checkValues = [email];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rowCount > 0) {
      // Co-worker with the same email already exists
      res.status(409).json({ message: 'Co-worker with the same email already exists' });
      return;
    }

    // Insert the co-worker into the "co_workers" table
    const insertQuery = 'INSERT INTO co_workers (email, name, password) VALUES ($1, $2, $3) RETURNING id';
    const insertValues = [email, name, password];

    const result = await pool.query(insertQuery, insertValues);

    const newCoWorkerId = result.rows[0].id;

    // Associate the co-worker with the specified workspaces
    const workspaceInsertQuery = 'INSERT INTO co_worker_workspace (co_worker_id, workspace_id) VALUES ($1, $2)';
    const workspaceInsertValues = workspaceIds.map(workspaceId => [newCoWorkerId, workspaceId]);

    await Promise.all(workspaceInsertValues.map(values => pool.query(workspaceInsertQuery, values)));

    res.status(201).json({ message: 'Co-worker added successfully', coWorkerId: newCoWorkerId });
  } catch (error) {
    console.error('Error adding co-worker:', error);
    res.status(500).json({ message: 'Error adding co-worker' });
  }
});



// Endpoint to delete a channel
app.delete('/channels/:id', async (req, res) => {
  try {
    const channelId = req.params.id;

    // Check if the channel exists
    const checkQuery = 'SELECT id FROM channel WHERE id = $1';
    const checkValues = [channelId];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rowCount === 0) {
      // Channel not found
      res.status(404).json({ message: 'Channel not found' });
      return;
    }

    // Delete the channel from the "channel" table
    const deleteQuery = 'DELETE FROM channel WHERE id = $1';
    const deleteValues = [channelId];

    await pool.query(deleteQuery, deleteValues);

    res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error('Error deleting channel:', error);
    res.status(500).json({ message: 'Error deleting channel' });
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