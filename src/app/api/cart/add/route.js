import clientPromise from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, product, selectedColor, selectedSize, quantity, orderId, addedAt } = body;

    if (!email || !product) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Weaver");
    const cartCollection = db.collection("cart");

    // Check if same product/color/size already exists
    const existing = await cartCollection.findOne({
      email,
      "product.name": product.name,
      selectedColor,
      selectedSize,
    });

    if (existing) {
      // Increment quantity
      await cartCollection.updateOne(
        { _id: existing._id },
        { $inc: { quantity } }
      );
      return new Response(JSON.stringify({ message: "Product quantity updated in cart" }), { status: 200 });
    }

    // Insert new cart item
    await cartCollection.insertOne({
      orderId,
      email,
      product,
      selectedColor,
      selectedSize,
      quantity,
      addedAt,
    });

    return new Response(JSON.stringify({ message: "Product added to cart successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
