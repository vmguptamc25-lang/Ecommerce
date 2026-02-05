import { createUser, findUserByEmail } from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, uniqid } = await req.json();

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ name, email, password: hashedPassword, uniqid });

    return new Response(JSON.stringify({ message: "Signup successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
