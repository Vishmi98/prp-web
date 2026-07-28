import axios from "axios";

import { MembersResponseDataType, MembersResponseType, PublishMemberResponseDataType } from "./team.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getMembers = async (page?: number, limit?: number): Promise<MembersResponseDataType> => {
    const response: MembersResponseType = await apiCall({
        url: `${URL}/team/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        teamMembers: data.teamMembers || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalMembers: data.totalMembers ?? 0,
    };
};

export const publishMember = async (id: number, isPublish: boolean): Promise<PublishMemberResponseDataType> => {
    const response: PublishMemberResponseDataType = await apiCall({
        url: `${URL}/team/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createMember = async (data: FormData) => {
    const res = await axios.post(`${URL}/team/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            teamMember: response.data,
        },
    };
};

export const updateMember = async (data: FormData) => {
    const res = await axios.post(`${URL}/team/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    const response = res.data;

    return {
        success: response.success,
        message: response.message,
        data: {
            teamMember: response.data,
        },
    };
};
