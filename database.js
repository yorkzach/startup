const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup')
const usersCollection = db.collection('user')
const walksCollection = db.collection('walks')

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  async function addUser(username, password) {
    const newUser = { username, password, token: uuid.v4()};
    const result = await usersCollection.insertOne(newUser);
    return result.insertedId;
  }
  function getUser(username) {
    return userCollection.findOne({ username: username });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }

  function addWalk(walk) {
    scoreCollection.insertOne(walk);
  }

  function getWalks() {
    const query = { username: userName };
    const cursor = scoreCollection.find(query);
    return cursor.toArray();
  }

module.exports = { addUser, getUser, getUserByToken, addWalk, getWalks };