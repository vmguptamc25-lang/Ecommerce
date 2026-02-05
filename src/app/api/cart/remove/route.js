import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req) {
    try {
        const { email, orderId } = await req.json();

        if (!email || !orderId) {
            return NextResponse.json({ message: "Email and orderId required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("Weaver");
        const cartCollection = db.collection("cart");

        // Check if product exists for this user
        const existing = await cartCollection.findOne({
            email: email.trim(),
            orderId: orderId,
        });

        if (existing) {
            // Remove product from cart
            await cartCollection.deleteOne({
                email: email.trim(),
                orderId: orderId,
            });
            return NextResponse.json(
                { message: "Product removed from Cart", success: true },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Product not found in cart", success: false },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("REMOVE_CART_ERROR:", error);
        return NextResponse.json({ message: "Server error", success: false }, { status: 500 });
    }
}
