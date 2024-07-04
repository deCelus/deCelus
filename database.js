const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

module.exports = { connectDB };
