const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { addUser, getUserData } = require('./database'); // Import functions from database.js

const port = process.env.PORT || 3000;

app.use(express.json());

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        // Add user to the database
        const userId = await addUser(username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Fetch user data from the database
        const userData = await getUserData(username);
        if (!userData) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Return any additional data you want to send to the frontend upon successful login
        res.json({ message: 'Login successful', userId: userData._id });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/users/:username', async (req, res) => {
    const username = req.params.username;
    try {
        // Fetch user data from the database based on the provided username
        const userData = await getUserData(username);
        // Then send the user data back as the response
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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