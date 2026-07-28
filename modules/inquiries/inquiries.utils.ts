import * as Yup from 'yup';

import { InquiryType } from './inquiries.types';


export const inquiryInitialValues: InquiryType = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
};

export const inquiryValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .trim(),

    lastName: Yup.string()
        .trim(),

    email: Yup.string()
        .required("Email address is required")
        .email("Invalid email address format")
        .trim(),

    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
            "Invalid phone number format"
        )
        .trim(),

    message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(500, "Message cannot exceed 500 characters")
        .trim(),
});