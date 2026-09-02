import { CreateSessionRequestPayload, CreateSessionRequestResponseDataType, CreateSessionRequestResponseType, CreateSessionResponseDataType, CreateSessionResponseType, PublishSessionResponseDataType, SessionRequestsResponseDataType, SessionRequestsResponseType, SessionsResponseDataType, SessionsResponseType, SessionType } from "./sessions.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";

export const getSessions = async (page?: number, limit?: number): Promise<SessionsResponseDataType> => {
    const response: SessionsResponseType = await apiCall({
        url: `${URL}/session/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        sessions: data.sessions || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalSessions: data.totalSessions ?? 0,
    };
};

export const publishSession = async (id: number, isPublish: boolean): Promise<PublishSessionResponseDataType> => {
    const response: PublishSessionResponseDataType = await apiCall({
        url: `${URL}/session/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createSession = async (body: SessionType): Promise<CreateSessionResponseDataType> => {
    const response: CreateSessionResponseType = await apiCall({
        url: `${URL}/session/create`,
        method: "POST",
        body,
    });

    return {
        success: response.success,
        message: response.message,
        data: {
            session: response.data,
        },
    };
};

export const updateSession = async (body: SessionType): Promise<CreateSessionResponseDataType> => {
    const response: CreateSessionResponseType = await apiCall({
        url: `${URL}/session/update`,
        method: "POST",
        body,
    });

    return {
        success: response.success,
        message: response.message,
        data: {
            session: response.data,
        },
    };
};

export const getSessionRequests = async (page?: number, limit?: number): Promise<SessionRequestsResponseDataType> => {
    const response: SessionRequestsResponseType = await apiCall({
        url: `${URL}/session-request/get-all`,
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

export const updateSessionRequestStatus = async (id: number, status: string): Promise<PublishSessionResponseDataType> => {
    const response: PublishSessionResponseDataType = await apiCall({
        url: `${URL}/session-request/update-status`,
        method: 'POST',
        body: { id, status },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createSessionRequest = async (
    body: CreateSessionRequestPayload
): Promise<CreateSessionRequestResponseDataType> => {
    const response: CreateSessionRequestResponseType = await apiCall({
        url: `${URL}/session-request/create`,
        method: "POST",
        body,
    });

    return {
        success: response.success ?? false,
        message: response.message || "No message provided",
        sessionRequest: response.data?.sessionRequest || null,
    };
};
