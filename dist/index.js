const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const port = process.env.PORT || 3000;
const app = express();

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to the database');

        const db = client.db(config.databaseName);
        const usersCollection = db.collection('users');

        async function addUser(username, password) {
            const newUser = { username, password };
            const result = await usersCollection.insertOne(newUser);
            console.log(`Added new user with ID: ${result.insertedId}`);
            return result.insertedId;
        }

        async function updateUserPassword(userId, newPassword) {
            const result = await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: { password: newPassword } });
            console.log(`Updated password for user with ID: ${userId}`);
            return result.modifiedCount;
        }

        async function deleteUser(userId) {
            const result = await usersCollection.deleteOne({ _id: ObjectId(userId) });
            console.log(`Deleted user with ID: ${userId}`);
            return result.deletedCount;
        }

        async function getUserData(username) {
            return await usersCollection.findOne({ username });
        }

        app.use(express.json());

        app.post('/api/register', async (req, res) => {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                const userId = await addUser(username, hashedPassword);
                res.status(201).json({ message: 'User registered successfully', userId });
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        app.post('/api/login', async (req, res) => {
            const { username, password } = req.body;
            try {
                const userData = await getUserData(username);
                if (!userData) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
                const isPasswordValid = await bcrypt.compare(password, userData.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
                res.json({ message: 'Login successful', userId: userData._id });
            } catch (error) {
                console.error('Error logging in user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        app.get('/api/users/:username', async (req, res) => {
            const username = req.params.username;
            try {
                const userData = await getUserData(username);
                res.json(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        app.get('/api/protected', async (req, res) => {
            res.json({ message: 'Protected endpoint accessed' });
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } finally {
        await client.close();
    }
}

main().catch(console.error);
