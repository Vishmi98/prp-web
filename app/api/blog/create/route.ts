/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import BlogModel from "@/models/blog.model";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const date = formData.get("date") as string;
    const title = formData.get("title") as string;
    const paragraph1 = formData.get("paragraph1") as string;
    const paragraph2 = formData.get("paragraph2") as string;
    const paragraph3 = formData.get("paragraph3") as string;
    const url = formData.get("url") as string;

    const thumbnailImage = formData.get("thumbnailImage") as File | null;
    const coverImage = formData.get("coverImage") as File | null;

    if (!date?.trim() || !title?.trim() || !paragraph1?.trim() || !url?.trim()) {
      return sendErrorResponse("All fields are required", 200);
    }

    // ✅ Initialize image variables
    let thumbnailImagePath = "";
    let thumbnailImageId = "";
    let coverImagePath = "";
    let coverImageId = "";

    // ✅ Upload thumbnail image if provided
    if (thumbnailImage) {
      const buffer = Buffer.from(await thumbnailImage.arrayBuffer());
      const filename = `${Date.now()}-${thumbnailImage.name}`;
      const uploaded = await ImageKitService.uploadImage(buffer, filename, "prp_blogs/thumbnails");
      thumbnailImagePath = uploaded.url;
      thumbnailImageId = uploaded.fileId;
    }

    // ✅ Upload cover image if provided
    if (coverImage) {
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      const filename = `${Date.now()}-${coverImage.name}`;
      const uploaded = await ImageKitService.uploadImage(buffer, filename, "prp_blogs/covers");
      coverImagePath = uploaded.url;
      coverImageId = uploaded.fileId;
    }

    const lastItem = await BlogModel.findOne().sort({ id: -1 });
    const nextId = lastItem ? lastItem.id + 1 : 1;

    const blog = await BlogModel.create({
      id: nextId,
      date,
      title,
      paragraph1,
      paragraph2,
      paragraph3,
      url,
      thumbnailImagePath,
      thumbnailImageId,
      coverImagePath,
      coverImageId,
    });

    return sendSuccessResponse("Blog Created Successfully", { blog });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}
