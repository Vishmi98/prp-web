/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import TreatmentModel from "@/models/treatment.model";
import {
    sendErrorResponse,
    sendSuccessResponse
} from "@/services/apiResponse";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        const treatmentId =
            Number(formData.get("treatmentId"));

        const beforeImage =
            formData.get("beforeImage") as File;

        const afterImage =
            formData.get("afterImage") as File;

        if (
            !treatmentId ||
            !beforeImage ||
            !afterImage
        ) {
            return sendErrorResponse(
                "Treatment id and images are required",
                200
            );
        }

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

        const uploadImage = async (
            file: File,
            folder: string
        ) => {
            const buffer =
                Buffer.from(
                    await file.arrayBuffer()
                );

            return await ImageKitService.uploadImage(
                buffer,
                `${Date.now()}-${file.name}`,
                folder
            );
        };

        const beforeUploaded =
            await uploadImage(
                beforeImage,
                "treatments/results/before"
            );

        const afterUploaded =
            await uploadImage(
                afterImage,
                "treatments/results/after"
            );

        treatment.results.push({
            beforeImagePath:
                beforeUploaded.url,

            beforeImageId:
                beforeUploaded.fileId,

            afterImagePath:
                afterUploaded.url,

            afterImageId:
                afterUploaded.fileId,

        });

        await treatment.save();

        return sendSuccessResponse(
            "Before/After result added successfully",
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