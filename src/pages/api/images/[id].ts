import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const getAllGeneratedImage = await prisma.images.findMany({
        where: {
          creatorWalletAddress: req.query.id as string,
        },
      });
      res.status(200).json(getAllGeneratedImage);
    } catch (err) {
      console.error(err);
      res.status(403).json({ error: "Error has occured!!!" });
    }
  }
}
