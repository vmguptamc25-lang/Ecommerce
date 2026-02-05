import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "data", "product.json");

/* READ PRODUCTS */
export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to read product file" },
      { status: 500 }
    );
  }
}

/* UPDATE PRODUCTS */
export async function POST(req) {
  try {
    const body = await req.json();
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to write product file" },
      { status: 500 }
    );
  }
}
