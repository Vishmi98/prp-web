import * as Yup from 'yup';

import { TeamDataType } from './team.types';


export const addTeamInitialValues: TeamDataType = {
    id: 0,
    title: "",
    firstName: "",
    lastName: "",
    specialization: "",
    profileImagePath: "",
    profileImageId: "",
    socialLinks: {
        linkedin: "",
        instagram: "",
        facebook: "",
    },
    isPublish: false,
};

export const addTeamValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .trim(),

    firstName: Yup.string()
        .required("First name is required")
        .trim(),

    lastName: Yup.string()
        .trim()
        .optional(),

    specialization: Yup.string()
        .required("Specialization is required")
        .trim(),

    socialLinks: Yup.object().shape({
        linkedin: Yup.string()
            .url("Must be a valid URL")
            .optional(),
        instagram: Yup.string()
            .url("Must be a valid URL")
            .optional(),
        facebook: Yup.string()
            .url("Must be a valid URL")
            .optional(),
    }).optional(),

    isPublish: Yup.boolean().default(false),
});