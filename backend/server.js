const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyparser = require("body-parser")
const { MongoClient } = require('mongodb');
dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassCb';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get all the Passwords  
app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save the Passwords
app.post('/', async (req, res) => {
  const password = req.body;
  console.log('Saving password:', password);  // Log the incoming request
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.send({ success: true, result });
});

app.delete('/', async (req, res) => {
  const { id } = req.body;
  console.log('Deleting password with ID:', id);  // Log the incoming request
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id });
  res.send({ success: true, result });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})