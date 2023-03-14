import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const cloudinary = require("cloudinary").v2;

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const cloudImageId = await prisma.cloundinaryIds.create({
        data: {
          walletAddress: req.body.WalletAddress,
        },
      });

      //0xa5377d424aAe075934837F7086aabb6d74B358ac-assgk0kf2ksafm
      const baseCloudinaryId = `${cloudImageId.walletAddress}-${cloudImageId.id}`;

      await cloudinary.uploader.upload(req.body.ImageURLs[0], {
        public_id: `${baseCloudinaryId}-0`,
        //0xa537...58ac-assgk0kf2ksafm-0
      });
      await cloudinary.uploader.upload(req.body.ImageURLs[1], {
        public_id: `${baseCloudinaryId}-1`,
      });

      const CloudImagesURLs = {
        1: cloudinary.url(`${baseCloudinaryId}-0`),
        2: cloudinary.url(`${baseCloudinaryId}-1`),
      };

      const newUser = await prisma.user.findUnique({
        where: {
          walletAddress: req.body.WalletAddress,
        },
      });

      if (newUser === null) {
        await prisma.user.create({
          data: {
            walletAddress: req.body.WalletAddress,
          },
        });
      }

      const saveImages = await prisma.images.create({
        data: {
          urls: [CloudImagesURLs[1], CloudImagesURLs[2]],
          description: req.body.Description,
          minted: [false, false],
          creatorWalletAddress: req.body.WalletAddress,
        },
      });

      res.status(200).json(saveImages);
    } catch (err) {
      console.error(err);
      res.status(403).json({ error: "Error has occuredddd" });
    }
  }
}
