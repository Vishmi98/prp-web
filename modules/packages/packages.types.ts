export type PackageDataType = {
    id: number;
    name: string;
    price: number;
    link?: string;
    category?: string[];
    sessionsCount?: number;
    isPublish?: boolean;
}

export type PackageType = {
    id: number;
    name: string;
    price: number;
    link?: string;
    category?: string[];
    sessionsCount?: number;
}

export type PackagesResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalPackages: number;
    packages: PackageDataType[];
}

export type PackagesResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalPackages: number;
        packages: PackageDataType[];
    }
}

export type CreatePackageResponseDataType = {
    success: boolean;
    message: string;
    data: {
        package: PackageType;
    }
}

export type CreatePackageResponseType = {
    success: boolean;
    message: string;
    data: PackageType;
}

export type PublishPackageResponseDataType = {
    success: boolean;
    message: string;
    data: PackageDataType;
}

export interface PackageRequestType {
    id: number;
    packageId: number;
    fullName: string;
    email: string;
    phone: string;
    status: string;
}

export interface PackageRequestDataType {
    id: number;
    packageId: number;
    fullName: string;
    email: string;
    phone: string;
    status: string;
    packageInfo: PackageDataType;
}

export type PackagesRequestsResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalRequests: number;
    requests: PackageRequestDataType[];
}

export type PackagesRequestsResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalRequests: number;
        requests: PackageRequestDataType[];
    }
}

export type CreatePackageRequestPayload = {
    packageId: number;
    fullName: string;
    email: string;
    phone: string;
};

export type CreatePackageRequestResponseType = {
    success: boolean;
    message: string;
    data?: {
        packageRequest: PackageRequestType;
    };
};

export type CreatePackageRequestResponseDataType = {
    success: boolean;
    message: string;
    packageRequest: PackageRequestType | null;
};

export type EditPackageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: PackageDataType | null;
}

export interface PackageModalProps {
    pack: PackageDataType | null;
    isOpen: boolean;
    onClose: () => void;
}