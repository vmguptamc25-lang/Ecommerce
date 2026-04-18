// src/app/api/Orders/create-order/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import fs from "fs";
import path from "path";
export const dynamic = "force-dynamic";

const productFilePath = path.join(process.cwd(), "data", "product.json");


function findProduct(productsData, productName) {
  for (const category of productsData) {
    for (const sub of category.subWearCategory || []) {
      for (const p of sub.product || []) {
        if (p.name === productName) {
          if (typeof p.inventary !== "number") p.inventary = 0;
          return p;
        }
      }
    }
  }
  return null;
}

export async function POST(req) {
  try {
    const orderData = await req.json();

    const productsData = JSON.parse(fs.readFileSync(productFilePath, "utf-8"));

    // INVENTORY CHECK
    for (const item of orderData.originalProductData) {
      const productName = item.product.name;
      const quantity = Number(item.quantity);

      const product = findProduct(productsData, productName);
      if (!product) return NextResponse.json({ success: false, message: `Product "${productName}" not found` });

      if (product.inventary < quantity) {
        return NextResponse.json({
          success: false,
          message: `Only ${product.inventary} stock available for "${productName}"`,
        });
      }

      product.inventary -= quantity;
    }

    // WRITE INVENTORY BACK

    // SAVE ORDER TO DB
    const client = await clientPromise;
    const db = client.db("Weaver");
    await db.collection("Orders").insertOne(orderData);

    return NextResponse.json({ success: true, message: "Order placed successfully", orderId: orderData.orderId });
  } catch (err) {
    console.error("Order create error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
