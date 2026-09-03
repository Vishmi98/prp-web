import { FAQDataType, FAQResponse, FAQsResponse } from "./faq.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getFAQs = async (page?: number, limit = 5) => {
    const response = await apiCall<FAQsResponse>({
        url: `${URL}/faq/get-all`,
        method: "POST",
        body: { page, limit },
    });
    const data = response.data || {};
    return {
        success: response.success ?? false,
        message: response.message || "No message provided",
        faqs: data.faqs || [],
        page: data.page ?? 1,
        limit: data.limit ?? limit,
        totalPages: data.totalPages ?? 1,
        totalFaqs: data.totalFaqs ?? 0,
    };
};

export const createFAQ = (body: FAQDataType) =>
    apiCall<FAQResponse>({ url: `${URL}/faq/create`, method: "POST", body });

export const updateFAQ = (body: FAQDataType) =>
    apiCall<FAQResponse>({ url: `${URL}/faq/update`, method: "POST", body });

export const publishFAQ = (id: number, isPublish: boolean) =>
    apiCall<FAQResponse>({
        url: `${URL}/faq/publish`,
        method: "POST",
        body: { id, isPublish },
    });