import { NextResponse } from "next/server";
import clientPromise from "@/lib/db"; // adjust path if needed

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Weaver");
    const cartCollection = db.collection("cart"); // assuming your cart collection is named "Cart"

    await cartCollection.deleteMany({ email }); // delete all items for this user

    return NextResponse.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("CLEAR CART API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
