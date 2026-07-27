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
            100,
            "Short description must be at least 100 characters"
        )
        .max(
            300,
            "Short description cannot exceed 300 characters"
        ),
    description: Yup.string()
        .required("Description is required")
        .min(
            500,
            "Description must be at least 500 characters"
        ),
    overview: Yup.object().shape({
        numberOfTreatments: Yup.number()
            .required("Number of treatments is required")
            .min(
                1,
                "Minimum treatment count is 1"
            ),
        treatmentTime: Yup.string()
            .required("Treatment time is required"),
        recoveryTime: Yup.string()
            .required("Recovery time is required"),
        maximumResults: Yup.string()
            .required("Maximum results is required"),
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
                .required("Pricing description is required"),
        }),
    }),
    benefits: Yup.array()
        .of(
            Yup.string()
                .required("Benefit cannot be empty")
        )
        .min(
            1,
            "At least one benefit is required"
        ),
    procedureSteps: Yup.array()
        .of(
            Yup.string()
                .required("Procedure step cannot be empty")
        )
        .min(
            1,
            "At least one procedure step is required"
        ),
    isPublish: Yup.boolean(),
});