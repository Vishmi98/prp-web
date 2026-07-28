import axios from "axios";

import { PublishStoryResponseDataType, StoriesResponseDataType, StoriesResponseType } from "./story.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getStories = async (page?: number, limit?: number): Promise<StoriesResponseDataType> => {
    const response: StoriesResponseType = await apiCall({
        url: `${URL}/success-story/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        successStories: data.successStories || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalStories: data.totalStories ?? 0,
    };
};

export const publishStory = async (id: number, isPublish: boolean): Promise<PublishStoryResponseDataType> => {
    const response: PublishStoryResponseDataType = await apiCall({
        url: `${URL}/success-story/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createStory = async (data: FormData) => {
    const res = await axios.post(`${URL}/success-story/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            successStory: response.data,
        },
    };
};

export const updateStory = async (data: FormData) => {
    const res = await axios.post(`${URL}/success-story/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            successStory: response.data,
        },
    };
};
