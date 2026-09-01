import * as Yup from 'yup';

import { CreateGiftCardRequestPayload, GiftCardDataType } from './pricing.types';


export const addGiftCardInitialValues: GiftCardDataType = {
    id: 0,
    amount: 0,
    title: "",
    description: "",
    imagePath: "",
    imageId: "",
    isPublish: false,
};

export const addGiftCardValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .trim(),

    amount: Yup.number()
        .typeError("Amount must be a valid number")
        .required("Amount is required")
        .positive("Amount must be greater than 0"),

    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description cannot exceed 200 characters"),

    isPublish: Yup.boolean().default(false),
});

export const giftCardFormInitialValues: CreateGiftCardRequestPayload = {
    giftCardId: 0,
    fullName: "",
    email: "",
    phone: "",
};

// Phone validation regex for international/standard phone formats
const auPhoneRegExp = /^(?:\+?61|0)[23478](?:[ -]?\d){8}$/;

// Validation Schema using Yup
export const giftCardValidationSchema = Yup.object<CreateGiftCardRequestPayload>({
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