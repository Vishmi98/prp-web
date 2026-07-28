import * as Yup from 'yup';

import { StoryDataType } from './story.types';


export const addStoryInitialValues: StoryDataType = {
    id: 0,
    clientName: "",
    treatmentName: "",
    comment: "",
    profileImagePath: "",
    profileImageId: "",
    rating: 5,
    isPublish: false,
};

export const addStoryValidationSchema = Yup.object().shape({
    clientName: Yup.string()
        .trim()
        .required("Client name is required"),

    treatmentName: Yup.string()
        .trim()
        .required("Treatment name is required"),

    comment: Yup.string()
        .trim()
        .max(200, "Comment cannot exceed 200")
        .required("Comment is required"),

    rating: Yup.number()
        .typeError("Rating must be a valid number")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .required("Rating is required"),

    isPublish: Yup.boolean().default(false),
});