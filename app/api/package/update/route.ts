/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import PackageModel from "@/models/package.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

const ALLOWED_CATEGORIES = ["Hair", "Skin", "Scalp", "Face"] as const;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => ({}));
    const { id, name, price, link, category, sessionsCount, isPublish } = body;

    // Validate numeric ID presence
    const numericId = Number(id);
    if (id === undefined || id === null || Number.isNaN(numericId)) {
      return sendErrorResponse("Invalid or missing package ID", 400);
    }

    const updateData: Record<string, any> = {};

    // Validate and apply fields if they are provided in the payload
    if (name !== undefined) {
      if (!name.trim()) {
        return sendErrorResponse("Package name cannot be empty", 400);
      }
      updateData.name = name.trim();
    }

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return sendErrorResponse("A valid package price is required", 400);
      }
      updateData.price = numericPrice;
    }

    if (link !== undefined) {
      updateData.link = link?.trim() || null;
    }

    if (category !== undefined) {
      const rawCategories = Array.isArray(category) ? category : [category].filter(Boolean);
      updateData.category = Array.from(
        new Set(
          rawCategories.filter((cat: any) =>
            ALLOWED_CATEGORIES.includes(cat)
          )
        )
      );
    }

    if (sessionsCount !== undefined) {
      const numericSessions = Number(sessionsCount);
      if (Number.isNaN(numericSessions) || numericSessions < 1) {
        return sendErrorResponse("Sessions count must be a valid positive number", 400);
      }
      updateData.sessionsCount = numericSessions;
    }

    if (isPublish !== undefined) {
      updateData.isPublish = Boolean(isPublish);
    }

    // Perform atomic update using custom auto-increment 'id' field
    const updatedPackage = await PackageModel.findOneAndUpdate(
      { id: numericId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedPackage) {
      return sendErrorResponse("Package not found", 404);
    }

    return sendSuccessResponse("Package updated successfully", {
      package: updatedPackage,
    });
  } catch (error: any) {
    console.error("Error updating package:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 500);
  }
}