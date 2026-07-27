/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import TreatmentModel from "@/models/treatment.model";
import {
    sendErrorResponse,
    sendSuccessResponse
} from "@/services/apiResponse";
import { ImageKitService } from "@/services/imagekit";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData =
            await req.formData();

        const treatmentId =
            Number(
                formData.get("treatmentId")
            );

        const treatment =
            await TreatmentModel.findOne({
                id: treatmentId
            });

        if (!treatment) {
            return sendErrorResponse(
                "Treatment not found",
                200
            );
        }

        const fields = [
            "title",
            "slug",
            "shortDescription",
            "description"
        ];

        fields.forEach(field => {
            const value =
                formData.get(field) as string;

            if (value) {
                (treatment as any)[field] = value;
            }
        });

        const thumbnailImage =
            formData.get("thumbnailImage") as File;

        const coverImage =
            formData.get("coverImage") as File;

        if (thumbnailImage) {
            if (treatment.thumbnailImageId) {
                await ImageKitService.deleteImage(
                    treatment.thumbnailImageId
                );
            }

            const buffer =
                Buffer.from(
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

        if (coverImage) {
            if (treatment.coverImageId) {
                await ImageKitService.deleteImage(
                    treatment.coverImageId
                );
            }

            const buffer =
                Buffer.from(
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

        await treatment.save();

        return sendSuccessResponse(
            "Treatment updated successfully",
            {
                treatment
            }
        );
    } catch (error: any) {
        return sendErrorResponse(
            error.message || "Unexpected error",
            200
        );
    }
}