const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('../dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const usersCollection = db.collection('user');
const walksCollection = db.collection('walks');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { username:username, password:passwordHash, token: uuid.v4()};
    await usersCollection.insertOne(newUser);
    return newUser;
  }
  function getUser(username) {
    return usersCollection.findOne({ username: username });
  }
  
  function getUserByToken(token) {
    return usersCollection.findOne({ token: token });
  }

  function addWalk(walk) {
    walksCollection.insertOne(walk);
  }

  function getWalks() {
    const query = { username:username };
    const cursor = walksCollection.find(query);
    return cursor.toArray();
  }

module.exports = { 
  createUser,
  getUser,
  getUserByToken,
  addWalk,
  getWalks,
 };