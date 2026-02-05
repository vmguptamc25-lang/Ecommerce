import clientPromise from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("Weaver");

    // Fetch only user-specific cart items
    const cartItems = await db
      .collection("cart")
      .find({ email: email.trim() })
      .sort({ addedAt: -1 })
      .toArray();

    // Safe mapping + ISO string formatting
    const data = cartItems.map((item) => ({
      ...item,
      _id: item._id.toString(),
      addedAt:
        item.addedAt instanceof Date
          ? item.addedAt.toISOString()
          : null,
    }));

    return new Response(
      JSON.stringify({ success: true, cartItems: data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GET_CART_ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch cart items" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
