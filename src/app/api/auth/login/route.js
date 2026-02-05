import { findUserByEmail } from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Use a static secret key (or from env in real apps)
const SECRET_KEY = "my_super_secret_key_123!";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Account not found" }),
        { status: 404 }
      );
    }

    // 2️⃣ Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // 3️⃣ Generate JWT token (expires in 1 hour)
    // Only include safe user info in token (do NOT include password)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // 4️⃣ Return token in response
    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
}
