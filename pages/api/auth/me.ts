import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken.split(" ")[1];

    const payload = jwt.decode(token) as unknown as {
      email: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
      exp: string;
    };

    if (!payload.email)
      return res.status(401).json({ errors: ["Unauthorized request"] });

    return res.status(200).json(payload);
  }

  return res.status(404).json("Unknown endpoint");
}
