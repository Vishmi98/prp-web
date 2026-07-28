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

    // Identify Target Resource
    const storyIdStr = formData.get("storyId") || formData.get("id");
    if (!storyIdStr) {
      return sendErrorResponse(
        "Valid item Identification (storyId/id) is required.",
        200
      );
    }
    const storyId = Number(storyIdStr);

    const successStory = await SuccessStoryModel.findOne({ id: storyId });
    if (!successStory) {
      return sendErrorResponse("Success story not found", 200);
    }

    // Text fields
    const clientName = formData.get("clientName") as string;
    const treatmentName = formData.get("treatmentName") as string;
    const comment = formData.get("comment") as string;
    const ratingStr = formData.get("rating") as string | null;

    // Image
    const profileImage = formData.get("profileImage") as File | null;

    // Store updated paths & IDs
    let profileImagePath = successStory.profileImagePath;
    let profileImageId = successStory.profileImageId;

    // Handle profile image update
    if (profileImage) {
      if (profileImageId) {
        await ImageKitService.deleteImage(profileImageId);
      }
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

    // Update document fields
    successStory.clientName = clientName || successStory.clientName;
    successStory.treatmentName = treatmentName || successStory.treatmentName;
    successStory.comment = comment || successStory.comment;
    successStory.rating = ratingStr !== null ? Number(ratingStr) : successStory.rating;

    successStory.profileImagePath = profileImagePath;
    successStory.profileImageId = profileImageId;

    await successStory.save();

    return sendSuccessResponse("Success story updated successfully", {
      successStory,
    });
  } catch (error: any) {
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}