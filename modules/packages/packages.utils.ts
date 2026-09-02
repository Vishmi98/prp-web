import * as Yup from "yup";

import { CreatePackageRequestPayload, PackageType } from "./packages.types";


export const addPackageInitialValues: PackageType = {
    id: 0,
    name: "",
    price: 0,
    category: [],
    link: "",
    sessionsCount: 0,
};

export const addPackageValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Package name is required")
        .trim(),

    price: Yup.number()
        .typeError("Price must be a valid number")
        .required("Price is required")
        .positive("Price must be greater than 0"),

    category: Yup.array()
        .of(Yup.string())
        .min(1, "Select at least one category")
        .required("Category is required"),

    link: Yup.string()
        .optional()
        .url("Must be a valid URL")
        .trim(),

    sessionsCount: Yup.number()
        .optional()
});

export const packageFormInitialValues: CreatePackageRequestPayload = {
    packageId: 0,
    fullName: "",
    email: "",
    phone: "",
};

// Phone validation regex for international/standard phone formats
const auPhoneRegExp = /^(?:\+?61|0)[23478](?:[ -]?\d){8}$/;

// Validation Schema using Yup
export const packageValidationSchema = Yup.object<CreatePackageRequestPayload>({
    fullName: Yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .required("Full name is required"),
    email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email address is required"),
    phone: Yup.string()
        .trim()
        .matches(
            auPhoneRegExp,
            "Please enter a valid Australian phone number (e.g. 0412345678 or +61412345678)"
        )
        .required("Phone number is required"),
});