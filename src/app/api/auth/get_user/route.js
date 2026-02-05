import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/db"; // your MongoClient connection

export async function GET(req) {
  try {
    console.log("GET route hit");

    // 1️⃣ Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Weaver"); // your DB name
    const usersCollection = db.collection("Register_users"); // your collection name

    // 2️⃣ Read authorization header
    const authHeader = req.headers.get("authorization"); // lowercase
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    // 3️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 4️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // 5️⃣ Find user using email in token
    const user = await usersCollection.findOne({ email: decoded.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 6️⃣ Return user data
    return NextResponse.json({ name: user.name, email: user.email }, { status: 200 });

  } catch (error) {
    console.error("GET_USER ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
