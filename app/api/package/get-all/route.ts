/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import PackageModel from "@/models/package.model";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => ({})); // Fallback for empty body
    const { page, limit } = body;

    let packages;
    const totalPackages = await PackageModel.countDocuments();

    if (page && limit) {
      const skip = (page - 1) * limit;
      const totalPages = Math.ceil(totalPackages / limit);

      packages = await PackageModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      return sendSuccessResponse(
        "Packages fetched successfully",
        {
          page,
          limit,
          totalPages,
          totalPackages,
          packages,
        },
      );
    } else {
      packages = await PackageModel.find({ isPublish: true }).sort({ createdAt: 1 }).lean();

      return sendSuccessResponse(
        "All packages fetched successfully", {
        totalPackages,
        packages,
      },
      );
    }
  } catch (error: any) {
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}
