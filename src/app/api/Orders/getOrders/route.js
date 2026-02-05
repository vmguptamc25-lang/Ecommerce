import { NextResponse } from "next/server";
import clientPromise from "@/lib/db"; // adjust path if needed

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");


        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("Weaver");
        const ordersCollection = db.collection("Orders");

        // Fetch orders from MongoDB
        const userOrders = await ordersCollection.find({ customerEmail: email }).toArray();

        return NextResponse.json({ success: true, orders: userOrders });
    } catch (error) {
        console.error("GET /api/orders error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
