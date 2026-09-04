import axios from "axios";

import { PublishTreatmentResponseDataType, SingleTreatmentResponseDataType, SingleTreatmentResponseType, TreatmentResultsResponseDataType, TreatmentResultsResponseType, TreatmentsResponseDataType, TreatmentsResponseType } from "./treatments.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getTreatments = async (page?: number, limit?: number): Promise<TreatmentsResponseDataType> => {
    const response: TreatmentsResponseType = await apiCall({
        url: `${URL}/treatment/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        treatments: data.treatments || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalTreatments: data.totalTreatments ?? 0,
    };
};

export const publishTreatment = async (id: number, isPublish: boolean): Promise<PublishTreatmentResponseDataType> => {
    const response: PublishTreatmentResponseDataType = await apiCall({
        url: `${URL}/treatment/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const deleteTreatment = async (id: number): Promise<PublishTreatmentResponseDataType> => {
    const response: PublishTreatmentResponseDataType = await apiCall({
        url: `${URL}/treatment/delete-by-id`,
        method: "DELETE",
        body: { id },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data,
    };
};

export const createTreatment = async (data: FormData) => {
    const res = await axios.post(`${URL}/treatment/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            treatment: response.data,
        },
    };
};

export const updateTreatment = async (data: FormData) => {
    const res = await axios.post(`${URL}/treatment/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            treatment: response.data,
        },
    };
};

export const addResults = async (data: FormData) => {
    const res = await axios.post(`${URL}/treatment/add-result`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            treatment: response.data,
        },
    };
};

export const getTreatmentResults = async (): Promise<TreatmentResultsResponseDataType> => {
    const response: TreatmentResultsResponseType = await apiCall({
        url: `${URL}/treatment/get-results`, // Adjust API route URL if needed
        method: "POST",
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || "No message provided",
        results: data.results || [],
    };
};

export const getTreatmentResultsByTreatmentType = async (
    treatmentType: string
): Promise<TreatmentResultsResponseDataType> => {
    const response: TreatmentResultsResponseType = await apiCall({
        url: `${URL}/treatment/get-by-type`, // Adjust API route URL if needed
        method: "POST",
        body: { treatmentType }, // Pass treatmentType in the request body
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || "No message provided",
        results: data.results || [],
    };
};

export const getTreatmentBySlug = async (props: { slug: string }): Promise<SingleTreatmentResponseType> => {
    const { slug } = props;

    const response: SingleTreatmentResponseDataType = await apiCall({
        url: `${URL}/treatment/get-by-slug`,
        method: 'POST',
        body: { slug },
    })

    return ({
        success: response.success,
        message: response.message,
        treatment: response.data.treatment
    });
};