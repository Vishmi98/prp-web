import * as Yup from 'yup';

import { ServiceDataType } from './services.types';


export const addServiceInitialValues: ServiceDataType = {
    id: 0,
    title: "",
    description: "",
    thumbnailImagePath: "",
    thumbnailImageId: "",
    isPublish: false,
};

export const addServiceValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .trim(),

    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(100, "Description cannot exceed 100 characters"),

    isPublish: Yup.boolean().default(false),
});