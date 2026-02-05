import { NextResponse } from "next/server";
import clientPromise from "@/lib/db"; // adjust path if needed

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    console.log(email);
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Weaver");

    // Fetch all orders of this customer
    const orders = await db
      .collection("Orders")
      .find({ customerEmail: email })
      .sort({ orderDate: -1 })
      .toArray();

    if (!orders || orders.length === 0) {
      return NextResponse.json({ success: false, message: "No orders found" });
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET /api/customer-orders error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
