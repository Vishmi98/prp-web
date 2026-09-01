import axios from "axios";

import { CardsRequestsResponseDataType, CardsRequestsResponseType, CardsResponseDataType, CardsResponseType, CreateGiftCardRequestPayload, CreateGiftCardRequestResponseDataType, CreateGiftCardRequestResponseType, GiftCardRequestType, PublishCardResponseDataType } from "./pricing.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getGiftCards = async (page?: number, limit?: number): Promise<CardsResponseDataType> => {
    const response: CardsResponseType = await apiCall({
        url: `${URL}/gift/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        cards: data.cards || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalCards: data.totalCards ?? 0,
    };
};

export const publishGiftCard = async (id: number, isPublish: boolean): Promise<PublishCardResponseDataType> => {
    const response: PublishCardResponseDataType = await apiCall({
        url: `${URL}/gift/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createGiftCard = async (data: FormData) => {
    const res = await axios.post(`${URL}/gift/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            giftCard: response.data,
        },
    };
};

export const updateGiftCard = async (data: FormData) => {
    const res = await axios.post(`${URL}/gift/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            giftCard: response.data,
        },
    };
};

export const getGiftCardRequests = async (page?: number, limit?: number): Promise<CardsRequestsResponseDataType> => {
    const response: CardsRequestsResponseType = await apiCall({
        url: `${URL}/gift-request/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        requests: data.requests || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalRequests: data.totalRequests ?? 0,
    };
};

export const updateGiftCardRequestStatus = async (id: number, status: string): Promise<PublishCardResponseDataType> => {
    const response: PublishCardResponseDataType = await apiCall({
        url: `${URL}/gift-request/update-status`,
        method: 'POST',
        body: { id, status },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createGiftCardRequest = async (
    body: CreateGiftCardRequestPayload
): Promise<CreateGiftCardRequestResponseDataType> => {
    const response: CreateGiftCardRequestResponseType = await apiCall({
        url: `${URL}/gift-request/create`,
        method: "POST",
        body,
    });

    return {
        success: response.success ?? false,
        message: response.message || "No message provided",
        giftCardRequest: response.data?.giftCardRequest || null,
    };
};