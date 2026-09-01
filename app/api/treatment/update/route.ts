/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import TreatmentModel from "@/models/treatment.model";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        const treatmentId = Number(
            formData.get("treatmentId")
        );

        if (!treatmentId || Number.isNaN(treatmentId)) {
            return sendErrorResponse(
                "Valid treatment ID is required",
                200
            );
        }

        const treatment = await TreatmentModel.findOne({
            id: treatmentId,
        });

        if (!treatment) {
            return sendErrorResponse(
                "Treatment not found",
                200
            );
        }

        // =========================
        // Basic fields
        // =========================

        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const shortDescription =
            formData.get("shortDescription") as string | null;
        const description =
            formData.get("description") as string | null;

        if (title !== null) {
            if (!title.trim()) {
                return sendErrorResponse(
                    "Title cannot be empty",
                    200
                );
            }

            treatment.title = title.trim();
        }

        if (slug !== null) {
            if (!slug.trim()) {
                return sendErrorResponse(
                    "Slug cannot be empty",
                    200
                );
            }

            treatment.slug = slug.trim();
        }

        if (shortDescription !== null) {
            treatment.shortDescription =
                shortDescription;
        }

        if (description !== null) {
            treatment.description =
                description;
        }

        // =========================
        // Overview
        // =========================

        const numberOfTreatments =
            formData.get("numberOfTreatments");

        const treatmentTime =
            formData.get("treatmentTime");

        const recoveryTime =
            formData.get("recoveryTime");

        const maximumResults =
            formData.get("maximumResults");

        const priceAmount =
            formData.get("priceAmount");

        const currency =
            formData.get("currency");

        const priceDescription =
            formData.get("priceDescription");

        if (
            numberOfTreatments !== null ||
            treatmentTime !== null ||
            recoveryTime !== null ||
            maximumResults !== null ||
            priceAmount !== null ||
            currency !== null ||
            priceDescription !== null
        ) {
            treatment.overview = {
                numberOfTreatments:
                    numberOfTreatments !== null
                        ? Number(numberOfTreatments)
                        : treatment.overview?.numberOfTreatments || 1,

                treatmentTime:
                    treatmentTime !== null
                        ? String(treatmentTime)
                        : treatment.overview?.treatmentTime || "",

                recoveryTime:
                    recoveryTime !== null
                        ? String(recoveryTime)
                        : treatment.overview?.recoveryTime || "",

                maximumResults:
                    maximumResults !== null
                        ? String(maximumResults)
                        : treatment.overview?.maximumResults || "",

                pricing: {
                    amount:
                        priceAmount !== null
                            ? Number(priceAmount)
                            : treatment.overview?.pricing?.amount || 0,

                    currency:
                        currency !== null
                            ? String(currency)
                            : treatment.overview?.pricing?.currency || "USD",

                    description:
                        priceDescription !== null
                            ? String(priceDescription)
                            : treatment.overview?.pricing?.description || "",
                },
            };
        }

        // =========================
        // Benefits
        // =========================

        const benefitsData =
            formData.get("benefits");

        if (benefitsData !== null) {
            try {
                treatment.benefits =
                    JSON.parse(String(benefitsData));
            } catch {
                return sendErrorResponse(
                    "Invalid benefits data",
                    200
                );
            }
        }

        // =========================
        // Procedure Steps
        // =========================

        const procedureStepsData =
            formData.get("procedureSteps");

        if (procedureStepsData !== null) {
            try {
                treatment.procedureSteps =
                    JSON.parse(
                        String(procedureStepsData)
                    );
            } catch {
                return sendErrorResponse(
                    "Invalid procedure steps data",
                    200
                );
            }
        }

        // =========================
        // Thumbnail Image
        // =========================

        const thumbnailImage =
            formData.get("thumbnailImage") as File | null;

        if (
            thumbnailImage &&
            thumbnailImage instanceof File &&
            thumbnailImage.size > 0
        ) {
            // Delete old image
            if (treatment.thumbnailImageId) {
                await ImageKitService.deleteImage(
                    treatment.thumbnailImageId
                );
            }

            const buffer = Buffer.from(
                await thumbnailImage.arrayBuffer()
            );

            const uploaded =
                await ImageKitService.uploadImage(
                    buffer,
                    `${Date.now()}-${thumbnailImage.name}`,
                    "treatments/thumbnails"
                );

            treatment.thumbnailImagePath =
                uploaded.url;

            treatment.thumbnailImageId =
                uploaded.fileId;
        }

        // =========================
        // Cover Image
        // =========================

        const coverImage =
            formData.get("coverImage") as File | null;

        if (
            coverImage &&
            coverImage instanceof File &&
            coverImage.size > 0
        ) {
            // Delete old image
            if (treatment.coverImageId) {
                await ImageKitService.deleteImage(
                    treatment.coverImageId
                );
            }

            const buffer = Buffer.from(
                await coverImage.arrayBuffer()
            );

            const uploaded =
                await ImageKitService.uploadImage(
                    buffer,
                    `${Date.now()}-${coverImage.name}`,
                    "treatments/covers"
                );

            treatment.coverImagePath =
                uploaded.url;

            treatment.coverImageId =
                uploaded.fileId;
        }

        // =========================
        // Save
        // =========================

        await treatment.save();

        return sendSuccessResponse(
            "Treatment updated successfully",
            {
                treatment,
            }
        );
    } catch (error: any) {
        console.error(
            "Update treatment error:",
            error
        );

        return sendErrorResponse(
            error.message ||
            "Unexpected error",
            200
        );
    }
}