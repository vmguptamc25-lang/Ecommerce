import clientPromise from "@/lib/db";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req) {
  try {
    const { token } = await req.json();

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub } = payload;

    const mongoClient = await clientPromise;
    const db = mongoClient.db();

    const users = db.collection("users");

    let user = await users.findOne({ email });

    if (!user) {
      await users.insertOne({
        name,
        email,
        picture,
        google_id: sub,
        createdAt: new Date()
      });

      user = await users.findOne({ email });
    }

    const jwtToken = jwt.sign(
      { email, id: user._id },
      process.env.GOOGLE_JWT_SECRET,
      { expiresIn: "1d" }
    );

    return new Response(
      JSON.stringify({ jwt: jwtToken, user }),
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Google Auth Failed" }),
      { status: 401 }
    );
  }
}
