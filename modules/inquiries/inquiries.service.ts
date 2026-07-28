import { CreateInquiryResponseDataType, CreateInquiryResponseType, InquiriesResponseDataType, InquiriesResponseType, InquiryType } from "./inquiries.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getInquiries = async (page?: number, limit?: number): Promise<InquiriesResponseDataType> => {
    const response: InquiriesResponseType = await apiCall({
        url: `${URL}/inquiry/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        inquiries: data.inquiries || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalInquiries: data.totalInquiries ?? 0,
    };
};

export const createInquiry = async (body: InquiryType): Promise<CreateInquiryResponseDataType> => {
    const response: CreateInquiryResponseType = await apiCall({
        url: `${URL}/inquiry/create`,
        method: "POST",
        body,
    });

    return {
        success: response.success,
        message: response.message,
        data: {
            inquiry: response.data,
        },
    };
};