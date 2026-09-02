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
        const {
            name,
            price,
            link,
            category,
            sessionsCount,
        } = body;

        if (!name?.trim()) {
            return sendErrorResponse("Package name is required", 400);
        }

        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice) || numericPrice < 0) {
            return sendErrorResponse("A valid package price is required", 400);
        }

        // Validate array input against allowed enums & eliminate duplicates
        const rawCategories = Array.isArray(category) ? category : [category].filter(Boolean);
        const validCategories = Array.from(
            new Set(
                rawCategories.filter((cat: any) =>
                    ALLOWED_CATEGORIES.includes(cat)
                )
            )
        );

        const lastItem = await PackageModel.findOne().sort({ id: -1 });
        const nextId = lastItem ? lastItem.id + 1 : 1;

        const packageItem = await PackageModel.create({
            id: nextId,
            name: name.trim(),
            price: numericPrice,
            link: link?.trim() || undefined,
            category: validCategories,
            sessionsCount:
                sessionsCount !== undefined && sessionsCount !== null
                    ? Number(sessionsCount)
                    : 1,
            isPublish: false,
        });

        return sendSuccessResponse("Package created successfully", {
            package: packageItem,
        });
    } catch (error: any) {
        console.error("Error creating package:", error);
        return sendErrorResponse(error?.message || "Unexpected error", 500);
    }
}