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

    // Identify Target Resource
    const serviceIdStr = formData.get("serviceId") || formData.get("id");
    if (!serviceIdStr) {
      return sendErrorResponse(
        "Valid item Identification (serviceId/id) is required.",
        200
      );
    }
    const serviceId = Number(serviceIdStr);

    const service = await ServiceModel.findOne({ id: serviceId });
    if (!service) {
      return sendErrorResponse("Service not found", 200);
    }

    // Text fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const isPublishStr = formData.get("isPublish");

    // Image
    const thumbnailImage = formData.get("thumbnailImage") as File | null;

    // Store updated paths & IDs
    let thumbnailImagePath = service.thumbnailImagePath;
    let thumbnailImageId = service.thumbnailImageId;

    // Handle thumbnail image
    if (thumbnailImage) {
      if (thumbnailImageId) {
        await ImageKitService.deleteImage(thumbnailImageId);
      }
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

    // Update service document
    service.title = title || service.title;
    service.description = description || service.description;
    if (isPublishStr !== null && isPublishStr !== undefined) {
      service.isPublish = isPublishStr === "true";
    }
    service.thumbnailImagePath = thumbnailImagePath;
    service.thumbnailImageId = thumbnailImageId;

    await service.save();

    return sendSuccessResponse("Service updated successfully", {
      service,
    });
  } catch (error: any) {
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}