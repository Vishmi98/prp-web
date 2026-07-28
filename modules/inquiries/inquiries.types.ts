export interface InquiryDataType {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

export type InquiryType = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

export type InquiriesResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalInquiries: number;
    inquiries: InquiryDataType[];
}

export type InquiriesResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalInquiries: number;
        inquiries: InquiryDataType[];
    }
}

export type CreateInquiryResponseDataType = {
    success: boolean;
    message: string;
    data: {
        inquiry: InquiryType;
    }
}

export type CreateInquiryResponseType = {
    success: boolean;
    message: string;
    data: InquiryType;
}