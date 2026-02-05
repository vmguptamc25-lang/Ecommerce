import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("Weaver");
        const watchlistCollection = db.collection("watchlist");

        // Fetch all documents for this email
        const items = await watchlistCollection.find({ email }).toArray();

        return NextResponse.json({ items }, { status: 200 });

    } catch (error) {
        console.error("FETCH_WATCHLIST_ERROR:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
