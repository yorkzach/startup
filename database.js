const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup')
const userCollection = db.collection('user')
const publicCollection = db.collection('progress')

(async function testConnection(){
    await client.connect();
    console.log('Connected to the database');
    })

    // Function to add a new user
    async function addUser(username, password) {
        const newUser = { username, password };
        const result = await usersCollection.insertOne(newUser);
        console.log(`Added new user with ID: ${result.insertedId}`);
        return result.insertedId;
    }

    // Function to update user's password
    async function updateUserPassword(userId, newPassword) {
        const result = await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: { password: newPassword } });
        console.log(`Updated password for user with ID: ${userId}`);
        return result.modifiedCount;
    }

    // Function to delete a user
    async function deleteUser(userId) {
        const result = await usersCollection.deleteOne({ _id: ObjectId(userId) });
        console.log(`Deleted user with ID: ${userId}`);
        return result.deletedCount;
    }


module.exports = { addUser, updateUserPassword, deleteUser };