import axios from "axios";


import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";
import { PublishTreatmentResponseDataType, TreatmentsResponseDataType, TreatmentsResponseType } from "./treatments.types";


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