/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import SuccessStoryModel from "@/models/successStory.model";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const clientName = formData.get("clientName") as string;
    const treatmentName = formData.get("treatmentName") as string;
    const comment = formData.get("comment") as string;
    const ratingStr = formData.get("rating") as string | null;

    const profileImage = formData.get("profileImage") as File | null;

    // Validation for required text fields
    if (!clientName?.trim() || !treatmentName?.trim() || !comment?.trim()) {
      return sendErrorResponse(
        "Client name, treatment name, and comment are required",
        200
      );
    }

    const rating = ratingStr ? Number(ratingStr) : 5;

    // Initialize image variables
    let profileImagePath = "";
    let profileImageId = "";

    // Upload profile image if provided
    if (profileImage) {
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      const filename = `${Date.now()}-${profileImage.name}`;
      const uploaded = await ImageKitService.uploadImage(
        buffer,
        filename,
        "prp_success_stories/profiles"
      );
      profileImagePath = uploaded.url;
      profileImageId = uploaded.fileId;
    }

    // Auto-increment ID sequence logic
    const lastItem = await SuccessStoryModel.findOne().sort({ id: -1 });
    const nextId = lastItem ? lastItem.id + 1 : 1;

    const successStory = await SuccessStoryModel.create({
      id: nextId,
      clientName,
      treatmentName,
      comment,
      profileImagePath,
      profileImageId,
      rating,
    });

    return sendSuccessResponse("Success story created successfully", {
      successStory,
    });
  } catch (error: any) {
    console.error("Error creating success story:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}