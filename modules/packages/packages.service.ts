import { CreatePackageRequestPayload, CreatePackageRequestResponseDataType, CreatePackageRequestResponseType, CreatePackageResponseDataType, CreatePackageResponseType, PackagesRequestsResponseDataType, PackagesRequestsResponseType, PackagesResponseDataType, PackagesResponseType, PackageType, PublishPackageResponseDataType } from "./packages.types";

import apiCall from "@/services/api.services";
import { URL } from "@/constants/config";


export const getPackages = async (page?: number, limit?: number): Promise<PackagesResponseDataType> => {
    const response: PackagesResponseType = await apiCall({
        url: `${URL}/package/get-all`,
        method: 'POST',
        body: { page, limit: limit || 5 },
    });

    const data = response.data || {};

    return {
        success: response.success ?? false,
        message: response.message || 'No message provided',
        packages: data.packages || [],
        page: data.page ?? 1,
        limit: data.limit ?? 5,
        totalPages: data.totalPages ?? 0,
        totalPackages: data.totalPackages ?? 0,
    };
};

export const publishPackage = async (id: number, isPublish: boolean): Promise<PublishPackageResponseDataType> => {
    const response: PublishPackageResponseDataType = await apiCall({
        url: `${URL}/package/publish`,
        method: 'POST',
        body: { id, isPublish },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createPackage = async (body: PackageType): Promise<CreatePackageResponseDataType> => {
    const response: CreatePackageResponseType = await apiCall({
        url: `${URL}/package/create`,
        method: "POST",
        body,
    });

    return {
        success: response.success,
        message: response.message,
        data: {
            package: response.data,
        },
    };
};

export const updatePackage = async (body: PackageType): Promise<CreatePackageResponseDataType> => {
    const response: CreatePackageResponseType = await apiCall({
        url: `${URL}/package/update`,
        method: "POST",
        body,
    });

    return {
        success: response.success,
        message: response.message,
        data: {
            package: response.data,
        },
    };
};

export const getPackageRequests = async (page?: number, limit?: number): Promise<PackagesRequestsResponseDataType> => {
    const response: PackagesRequestsResponseType = await apiCall({
        url: `${URL}/package-request/get-all`,
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

export const updatePackageRequestStatus = async (id: number, status: string): Promise<PublishPackageResponseDataType> => {
    const response: PublishPackageResponseDataType = await apiCall({
        url: `${URL}/package-request/update-status`,
        method: 'POST',
        body: { id, status },
    });

    return {
        success: response.success,
        message: response.message,
        data: response.data
    };
};

export const createPackageRequest = async (
    body: CreatePackageRequestPayload
): Promise<CreatePackageRequestResponseDataType> => {
    const response: CreatePackageRequestResponseType = await apiCall({
        url: `${URL}/package-request/create`,
        method: "POST",
        body,
    });

    return {
        success: response.success ?? false,
        message: response.message || "No message provided",
        packageRequest: response.data?.packageRequest || null,
    };
};