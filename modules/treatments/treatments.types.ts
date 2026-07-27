export interface BeforeAfterType {
    beforeImagePath: string;
    beforeImageId: string;
    afterImagePath: string;
    afterImageId: string;
}

export interface TreatmentPricingType {
    amount?: number;
    currency: string;
    description?: string;
}

export interface TreatmentOverviewType {
    numberOfTreatments: number;
    treatmentTime?: string;
    recoveryTime?: string;
    maximumResults?: string;
    pricing: TreatmentPricingType;
}

export interface TreatmentDataType {
    id: number;
    title: string;
    slug: string;
    overview: TreatmentOverviewType;
    shortDescription: string;
    description: string;
    benefits: string[];
    procedureSteps: string[];
    results: BeforeAfterType[];
    thumbnailImagePath?: string;
    thumbnailImageId?: string;
    coverImagePath?: string;
    coverImageId?: string;
    isPublish: boolean;
}

export type TreatmentsResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalTreatments: number;
    treatments: TreatmentDataType[];
}

export type TreatmentsResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalTreatments: number;
        treatments: TreatmentDataType[];
    }
}

export type CreateTreatmentResponseDataType = {
    success: boolean;
    message: string;
    data: {
        treatment: TreatmentDataType;
    }
}

export type CreateTreatmentResponseType = {
    success: boolean;
    message: string;
    data: TreatmentDataType;
}

export type TreatmentResponseDataType = {
    success: boolean;
    message: string;
    data: TreatmentDataType
}

export type TreatmentResponseType = {
    success: boolean;
    message: string;
    treatment: TreatmentDataType | null;
}

export type PublishTreatmentResponseDataType = {
    success: boolean;
    message: string;
    data: TreatmentDataType;
}

export type EditTreatmentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: TreatmentDataType | null;
}

export interface AddTreatmentResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    treatment: TreatmentDataType;
    reload: () => void;
}
