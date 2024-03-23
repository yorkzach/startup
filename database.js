const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to the database');

        // Get reference to the database
        const db = client.db(config.databaseName);

        // Define the users collection
        const usersCollection = db.collection('users');

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

        // Add more functions for CRUD operations on the users collection if needed

    } finally {
        await client.close();
    }
}

main().catch(console.error);

module.exports = { addUser, updateUserPassword, deleteUser };
