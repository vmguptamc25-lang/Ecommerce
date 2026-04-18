import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add MONGO_URL to environment variables");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect(); // still OK (lazy promise)
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
