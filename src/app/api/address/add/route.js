// src/app/api/address/add/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, fullName, phone, address, city, state, pincode } = body;

    if (!email || !address || !phone || !fullName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Weaver");

    const result = await db.collection("Addresses").insertOne({
      email,
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      address: { _id: result.insertedId, ...body },
    });
  } catch (err) {
    console.error("Address add error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
