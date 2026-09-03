import * as Yup from "yup";

import { FAQFormValues } from "./faq.types";


export const faqInitialValues: FAQFormValues = { 
    id: 0, 
    question: "", 
    answer: "" 
};

export const faqValidationSchema = Yup.object({
    question: Yup.string().trim().required("Question is required"),
    answer: Yup.string().trim().required("Answer is required"),
});