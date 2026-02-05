import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({ valid: false, message: "No token provided" }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.GOOGLE_JWT_SECRET);

    return new Response(
      JSON.stringify({ valid: true, user: decoded }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ valid: false, message: "Token expired or invalid" }),
      { status: 401 }
    );
  }
}
