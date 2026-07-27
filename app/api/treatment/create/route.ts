/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TreatmentModel from "@/models/treatment.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;

        const shortDescription = formData.get("shortDescription") as string;
        const description = formData.get("description") as string;

        const overview = {
            numberOfTreatments: Number(formData.get("numberOfTreatments")) || 1,
            treatmentTime: formData.get("treatmentTime") as string,
            recoveryTime: formData.get("recoveryTime") as string,
            maximumResults: formData.get("maximumResults") as string,

            pricing: {
                amount: Number(formData.get("priceAmount")) || 0,
                currency: formData.get("currency") || "USD",
                description: formData.get("priceDescription") as string,
            }
        };

        const benefits = JSON.parse(
            (formData.get("benefits") as string) || "[]"
        );

        const procedureSteps = JSON.parse(
            (formData.get("procedureSteps") as string) || "[]"
        );

        const thumbnailImage = formData.get("thumbnailImage") as File | null;
        const coverImage = formData.get("coverImage") as File | null;

        if (
            !title?.trim() ||
            !slug?.trim() ||
            !shortDescription?.trim() ||
            !description?.trim()
        ) {

            return sendErrorResponse(
                "Required fields missing",
                200
            );
        }

        let thumbnailImagePath = "";
        let thumbnailImageId = "";

        let coverImagePath = "";
        let coverImageId = "";


        if (thumbnailImage) {
            const buffer = Buffer.from(
                await thumbnailImage.arrayBuffer()
            );

            const uploaded =
                await ImageKitService.uploadImage(
                    buffer,
                    `${Date.now()}-${thumbnailImage.name}`,
                    "treatments/thumbnails"
                );


            thumbnailImagePath = uploaded.url;
            thumbnailImageId = uploaded.fileId;
        }

        if (coverImage) {

            const buffer = Buffer.from(
                await coverImage.arrayBuffer()
            );

            const uploaded =
                await ImageKitService.uploadImage(
                    buffer,
                    `${Date.now()}-${coverImage.name}`,
                    "treatments/covers"
                );

            coverImagePath = uploaded.url;
            coverImageId = uploaded.fileId;
        }

        const lastItem =
            await TreatmentModel
                .findOne()
                .sort({ id: -1 });

        const nextId =
            lastItem ? lastItem.id + 1 : 1;

        const treatment =
            await TreatmentModel.create({
                id: nextId,
                title,
                slug,
                overview,
                shortDescription,
                description,
                benefits,
                procedureSteps,
                // empty initially
                results: [],
                thumbnailImagePath,
                thumbnailImageId,
                coverImagePath,
                coverImageId,
            });

        return sendSuccessResponse(
            "Treatment created successfully",
            {
                treatment
            }
        );
    } catch (error: any) {
        console.error(error);
        return sendErrorResponse(
            error.message || "Unexpected error",
            200
        );
    }
}