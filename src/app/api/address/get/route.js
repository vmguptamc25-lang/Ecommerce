// src/app/api/address/get/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Weaver");

    const addresses = await db.collection("Addresses").find({ email }).toArray();

    return NextResponse.json({ success: true, addresses });
  } catch (err) {
    console.error("Address get error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
