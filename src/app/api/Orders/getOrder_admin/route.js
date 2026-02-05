import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    const orderStatus = searchParams.get("orderStatus");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const client = await clientPromise;
    const db = client.db("Weaver");
    const ordersCollection = db.collection("Orders");

    let query = {};

    // Address Filters
    if (state) query["deliveryAddress.state"] = state;
    if (city) query["deliveryAddress.city"] = city;

    // Customer Filters
    if (name) query.customerName = { $regex: name, $options: "i" };
    if (email) query.customerEmail = email;
    if (phone) query.customerPhone = phone;

    // Order Status
    if (orderStatus) query.orderStatus = orderStatus;

    // Date Range Filters
    if (startDate || endDate) {
      query.orderDate = {};

      if (startDate)
        query.orderDate.$gte = new Date(startDate + "T00:00:00.000Z");

      if (endDate)
        query.orderDate.$lte = new Date(endDate + "T23:59:59.999Z");
    }

    // Fetch matching orders
    const filteredOrders = await ordersCollection.find(query).sort({ orderDate: -1 }).toArray();

    return NextResponse.json({
      success: true,
      filters: { state, city, name, email, phone, orderStatus, startDate, endDate },
      orders: filteredOrders,
    });

  } catch (error) {
    console.error("GET /api/Orders/getOrder_admin error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
