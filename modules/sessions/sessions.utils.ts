import * as Yup from "yup";

import { CreateSessionRequestPayload, SessionType } from "./sessions.types";


export const addSessionInitialValues: SessionType = {
    id: 0,
    name: "",
    details: "",
    price: 0,
    duration: "",
};

export const addSessionValidationSchema = Yup.object({
    name: Yup.string().required("Session name is required").trim(),
    details: Yup.string().required("Session details are required").trim(),
    price: Yup.number().typeError("Price must be a valid number"),
    duration: Yup.string().required("Duration is required").trim(),
});

export const sessionFormInitialValues: CreateSessionRequestPayload = {
    sessionId: 0,
    fullName: "",
    email: "",
    phone: "",
};

// Phone validation regex for international/standard phone formats
const auPhoneRegExp = /^(?:\+?61|0)[23478](?:[ -]?\d){8}$/;

// Validation Schema using Yup
export const sessionValidationSchema = Yup.object<CreateSessionRequestPayload>({
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