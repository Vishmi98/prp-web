/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import GiftCardModel from "@/models/giftCard.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const amountStr = formData.get("amount") as string;
    const image = formData.get("image") as File | null;

    const amount = Number(amountStr);

    if (!title?.trim() || !description?.trim() || isNaN(amount) || amount <= 0) {
      return sendErrorResponse("Title, description, and a valid positive amount are required", 200);
    }

    // Initialize image variables
    let imagePath = "";
    let imageId = "";

    // Upload image if provided
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const uploaded = await ImageKitService.uploadImage(
        buffer,
        filename,
        "prp_gift_cards"
      );
      imagePath = uploaded.url;
      imageId = uploaded.fileId;
    }

    // Auto-increment numeric ID
    const lastItem = await GiftCardModel.findOne().sort({ id: -1 });
    const nextId = lastItem ? lastItem.id + 1 : 1;

    const giftCard = await GiftCardModel.create({
      id: nextId,
      title,
      description,
      amount,
      imagePath,
      imageId,
    });

    return sendSuccessResponse("Gift Card Created Successfully", { giftCard });
  } catch (error: any) {
    console.error("Error creating gift card:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}