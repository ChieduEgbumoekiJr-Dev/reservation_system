import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { times } from "../../../../data";
import { findavailableables } from "../../../../services/restaurant/findAvailableTables";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(404).json("Unknown endpoint");

  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({
      errors: ["Invalid data provided"],
    });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tabels: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant)
    return res.status(400).json({
      errors: ["Invalid data provided"],
    });

  const searchTimesWithTables = await findavailableables({
    day,
    time,
    restaurant,
    res,
  });

  if (!searchTimesWithTables)
    return res.status(400).json({
      errors: ["Invalid data provided"],
    });

  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => sum + table.seats, 0);

      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);
      const timeIsBeforeOClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeOClosingHour;
    });

  return res.json(availabilities);
}