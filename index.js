const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const dbName = 'trailoftails';

// ...

app.use(express.json());

// Database connection
async function connectDB() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return db;
}

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    await usersCollection.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Return any additional data you want to send to the frontend upon successful login
    res.json({ message: 'Login successful', userId: user._id });
});

// Protected endpoint - example
app.get('/api/protected', async (req, res) => {
    // Only accessible if user is authenticated
    res.json({ message: 'Protected endpoint accessed' });
});

// ...

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
