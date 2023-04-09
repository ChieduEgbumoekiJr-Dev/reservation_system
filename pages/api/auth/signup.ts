import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { firstName, lastName, email, phone, city, password } = req.body;

      const errors: string[] = [];

      const validationSchema = [
        {
          valid: validator.isLength(firstName, {
            min: 1,
            max: 20,
          }),
          errorMessage: "First name is invalid",
        },
        {
          valid: validator.isLength(lastName, {
            min: 1,
            max: 20,
          }),
          errorMessage: "Last name is invalid",
        },
        {
          valid: validator.isEmail(email),
          errorMessage: "Email is invalid",
        },
        {
          valid: validator.isMobilePhone(phone),
          errorMessage: "Phone number is invalid",
        },
        {
          valid: validator.isLength(city, { min: 1 }),
          errorMessage: "City is invalid",
        },
        {
          valid: validator.isStrongPassword(password),
          errorMessage: "Password is not strong enough",
        },
      ];

      validationSchema.forEach((check) => {
        if (!check.valid) {
          errors.push(check.errorMessage);
        }
      });

      if (errors.length) {
        return res.status(400).json({ errors: errors });
      }

      const userWithEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithEmail)
        return res
          .status(409)
          .json({ errors: ["Email is associated with another account"] });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          password: hashedPassword,
          city,
          phone,
          email,
        },
      });

      const alg = "HS256";
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new jose.SignJWT({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);

      res.status(200).send({ token: token });
    } catch (error: any) {
      res.status(400).send({ erros: [error.message ?? error] });
    }
  }
}
