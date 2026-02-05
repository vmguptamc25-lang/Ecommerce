import { NextResponse } from "next/server";
import clientPromise from "@/lib/db"; // adjust path if needed

export async function POST(req) {
  try {
    const { email, orderId } = await req.json();

    if (!email || !orderId) {
      return NextResponse.json(
        { success: false, message: "Missing email or orderId" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Weaver");
    const ordersCollection = db.collection("Orders");

    const result = await ordersCollection.deleteOne({
      orderId,
      customerEmail: email,
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        success: true,
        message: "Order canceled successfully",
        orderId,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("REMOVE ORDER API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
