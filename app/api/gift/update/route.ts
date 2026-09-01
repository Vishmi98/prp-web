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

    // Identify Target Resource
    const giftCardIdStr = formData.get("giftCardId") || formData.get("id");
    if (!giftCardIdStr) {
      return sendErrorResponse(
        "Valid item Identification (giftCardId/id) is required.",
        200
      );
    }
    const giftCardId = Number(giftCardIdStr);

    const giftCard = await GiftCardModel.findOne({ id: giftCardId });
    if (!giftCard) {
      return sendErrorResponse("Gift Card not found", 200);
    }

    // Text & Numeric fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const amountStr = formData.get("amount");
    const isPublishStr = formData.get("isPublish");

    // Image
    const image = formData.get("image") as File | null;

    // Store updated paths & IDs
    let imagePath = giftCard.imagePath;
    let imageId = giftCard.imageId;

    // Handle image upload & replace old image
    if (image) {
      if (imageId) {
        await ImageKitService.deleteImage(imageId);
      }
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

    // Update gift card document
    giftCard.title = title || giftCard.title;
    giftCard.description = description || giftCard.description;

    if (amountStr !== null && amountStr !== undefined) {
      const parsedAmount = Number(amountStr);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        giftCard.amount = parsedAmount;
      }
    }

    if (isPublishStr !== null && isPublishStr !== undefined) {
      giftCard.isPublish = isPublishStr === "true";
    }

    giftCard.imagePath = imagePath;
    giftCard.imageId = imageId;

    await giftCard.save();

    return sendSuccessResponse("Gift Card updated successfully", {
      giftCard,
    });
  } catch (error: any) {
    console.error("Error updating gift card:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}