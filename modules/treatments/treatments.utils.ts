import * as Yup from "yup";

import { TreatmentDataType } from "./treatments.types";


export const addTreatmentInitialValues: TreatmentDataType = {
    id: 0,
    title: "",
    slug: "",
    overview: {
        numberOfTreatments: 1,
        treatmentTime: "",
        recoveryTime: "",
        maximumResults: "",
        pricing: {
            amount: 0,
            currency: "USD",
            description: "",
        },
    },
    shortDescription: "",
    description: "",
    benefits: [],
    procedureSteps: [],
    results: [],
    thumbnailImagePath: "",
    thumbnailImageId: "",
    coverImagePath: "",
    coverImageId: "",
    isPublish: false,
};

export const addTreatmentValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required"),
    slug: Yup.string()
        .required("Slug is required")
        .matches(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers and hyphens"
        ),
    shortDescription: Yup.string()
        .required("Short description is required")
        .min(
            150,
            "Short description must be at least 150 characters"
        )
        .max(
            200,
            "Short description cannot exceed 200 characters"
        ),
    description: Yup.string()
        .required("Description is required")
        .min(
            600,
            "Description must be at least 600 characters"
        ).max(
            800,
            "Description cannot exceed 800 characters"
        ),
    overview: Yup.object().shape({
        numberOfTreatments: Yup.number()
            .required("Number of treatments is required")
            .min(
                1,
                "Minimum treatment count is 1"
            ),
        treatmentTime: Yup.string()
            .required("Treatment time is required")
            .min(
                10,
                "Treatment time must be at least 10 characters"
            ).max(
                30,
                "Treatment time cannot exceed 30 characters"
            ),
        recoveryTime: Yup.string()
            .required("Recovery time is required")
            .min(
                10,
                "Recovery time must be at least 10 characters"
            ).max(
                50,
                "Recovery time cannot exceed 50 characters"
            ),
        maximumResults: Yup.string()
            .required("Maximum results is required")
            .min(
                10,
                "Maximum results must be at least 10 characters"
            ).max(
                80,
                "Maximum results cannot exceed 80 characters"
            ),
        pricing: Yup.object().shape({
            amount: Yup.number()
                .required("Price amount is required")
                .min(
                    0,
                    "Price cannot be negative"
                ),
            currency: Yup.string()
                .required("Currency is required"),
            description: Yup.string()
                .required("Pricing description is required")
                .min(
                    10,
                    "Pricing description must be at least 10 characters"
                ).max(
                    80,
                    "Pricing description cannot exceed 80 characters"
                ),
        }),
    }),
    benefits: Yup.array()
        .of(
            Yup.string()
                .required("Benefit cannot be empty")
                .min(10, "Benefit must be at least 10 characters")
                .max(200, "Benefit cannot exceed 200 characters")
        )
        .min(1, "At least one benefit is required"),

    procedureSteps: Yup.array()
        .of(
            Yup.string()
                .required("Procedure step cannot be empty")
                .min(10, "Procedure step must be at least 10 characters")
                .max(300, "Procedure step cannot exceed 300 characters")
        )
        .min(1, "At least one procedure step is required"),
        
    isPublish: Yup.boolean(),
});