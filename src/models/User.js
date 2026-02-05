import clientPromise from "../lib/db";

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db("Weaver");
  return db.collection("Register_users").findOne({ email });
}

export async function createUser(user) {
  const client = await clientPromise;
  const db = client.db("Weaver");
  return db.collection("Register_users").insertOne(user);
}

export async function watchlist(email) {
  
}
