export interface ServiceDataType {
    id: number;
    title: string;
    description: string;
    thumbnailImagePath?: string;
    thumbnailImageId?: string;
    isPublish: boolean;
}

export type ServicesResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalServices: number;
    services: ServiceDataType[];
}

export type ServicesResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalServices: number;
        services: ServiceDataType[];
    }
}

export type CreateServiceResponseDataType = {
    success: boolean;
    message: string;
    data: {
        service: ServiceDataType;
    }
}

export type CreateServiceResponseType = {
    success: boolean;
    message: string;
    data: ServiceDataType;
}

export type ServiceResponseDataType = {
    success: boolean;
    message: string;
    data: ServiceDataType
}

export type ServiceResponseType = {
    success: boolean;
    message: string;
    service: ServiceDataType | null;
}

export type PublishServiceResponseDataType = {
    success: boolean;
    message: string;
    data: ServiceDataType;
}

export type EditServiceModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: ServiceDataType | null;
}