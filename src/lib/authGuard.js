import jwt from "jsonwebtoken";

export function verifySession(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, process.env.GOOGLE_JWT_SECRET);
  } catch {
    return null;
  }
}
