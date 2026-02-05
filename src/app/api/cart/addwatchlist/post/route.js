import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req) {
    try {
        const { email, product } = await req.json();

        if (!email || !product) {
            return NextResponse.json({ message: "Email and product required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("Weaver");

        const watchlistCollection = db.collection("watchlist");

        // 1️⃣ Check if product already exists for this user
        const existing = await watchlistCollection.findOne({
            'email': email.trim(),
            'product': product.trim(), // string comparison
        });
        console.log(existing)
        if (existing) {
            // 2️⃣ Remove product from watchlist
            await watchlistCollection.deleteOne({
                'email': email.trim(),
                'product': product.trim(),
            });
            console.log("i amhere")
            return NextResponse.json(
                { message: "Product removed from watchlist" },
                { status: 200 }
            );
        } else {
            // 2️⃣ Insert new product
            await watchlistCollection.insertOne({
                email,
                product,
                addedAt: new Date(),
            });

            return NextResponse.json({ message: "Product added successfully" }, { status: 200 });
        }

    } catch (error) {
        console.error("ADD_WATCHLIST_ERROR:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
