/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import ServiceModel from "@/models/service.model";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const thumbnailImage = formData.get("thumbnailImage") as File | null;

    if (!title?.trim() || !description?.trim()) {
      return sendErrorResponse("Title and description are required", 200);
    }

    // Initialize image variables
    let thumbnailImagePath = "";
    let thumbnailImageId = "";

    // Upload thumbnail image if provided
    if (thumbnailImage) {
      const buffer = Buffer.from(await thumbnailImage.arrayBuffer());
      const filename = `${Date.now()}-${thumbnailImage.name}`;
      const uploaded = await ImageKitService.uploadImage(
        buffer,
        filename,
        "prp_services/thumbnails"
      );
      thumbnailImagePath = uploaded.url;
      thumbnailImageId = uploaded.fileId;
    }

    const lastItem = await ServiceModel.findOne().sort({ id: -1 });
    const nextId = lastItem ? lastItem.id + 1 : 1;

    const service = await ServiceModel.create({
      id: nextId,
      title,
      description,
      thumbnailImagePath,
      thumbnailImageId,
    });

    return sendSuccessResponse("Service Created Successfully", { service });
  } catch (error: any) {
    console.error("Error creating service:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}