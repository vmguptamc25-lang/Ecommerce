import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { orderId, orderStatus, message } = body;

    if (!orderId || !orderStatus) {
      return NextResponse.json(
        { success: false, message: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Weaver");

    const result = await db.collection("Orders").updateOne(
      { orderId },
      {
        $set: {
          orderStatus,
          message: message || ""
        }
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Order not updated" });
    }

    return NextResponse.json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    console.error("PATCH /api/orders/update-order error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
