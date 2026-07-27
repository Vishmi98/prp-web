import axios from "axios";


import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";
import { PublishServiceResponseDataType, ServicesResponseDataType, ServicesResponseType } from "./services.types";


export const getServices = async (page?: number, limit?: number): Promise<ServicesResponseDataType> => {
    const response: ServicesResponseType = await apiCall({
        url: `${URL}/service/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        services: data.services || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalServices: data.totalServices ?? 0,
    };
};

export const publishService = async (id: number, isPublish: boolean): Promise<PublishServiceResponseDataType> => {
    const response: PublishServiceResponseDataType = await apiCall({
        url: `${URL}/service/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createService = async (data: FormData) => {
    const res = await axios.post(`${URL}/service/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            service: response.data,
        },
    };
};

export const updateService = async (data: FormData) => {
    const res = await axios.post(`${URL}/service/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            service: response.data,
        },
    };
};
