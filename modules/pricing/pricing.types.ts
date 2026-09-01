export interface GiftCardDataType {
    id: number;
    amount: number;
    title: string;
    description: string;
    imagePath: string;
    imageId: string;
    isPublish: boolean;
}

export type CardsResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalCards: number;
    cards: GiftCardDataType[];
}

export type CardsResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalCards: number;
        cards: GiftCardDataType[];
    }
}

export type CreateCardResponseDataType = {
    success: boolean;
    message: string;
    data: {
        card: GiftCardDataType;
    }
}

export type CreateCardResponseType = {
    success: boolean;
    message: string;
    data: GiftCardDataType;
}

export type PublishCardResponseDataType = {
    success: boolean;
    message: string;
    data: GiftCardDataType;
}

export type EditGiftCardModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: GiftCardDataType | null;
}

export interface GiftCardRequestType {
    id: number;
    giftCardId: number;
    fullName: string;
    email: string;
    phone: string;
    status: string;
}

export interface GiftCardRequestDataType {
    id: number;
    giftCardId: number;
    fullName: string;
    email: string;
    phone: string;
    status: string;
    giftCardInfo: GiftCardDataType;
}

export type CardsRequestsResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalRequests: number;
    requests: GiftCardRequestDataType[];
}

export type CardsRequestsResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalRequests: number;
        requests: GiftCardRequestDataType[];
    }
}

export type CreateGiftCardRequestPayload = {
    giftCardId: number;
    fullName: string;
    email: string;
    phone: string;
};

// API returns response.data = { giftCardRequest: GiftCardRequestType }
export type CreateGiftCardRequestResponseType = {
    success: boolean;
    message: string;
    data?: {
        giftCardRequest: GiftCardRequestType;
    };
};

export type CreateGiftCardRequestResponseDataType = {
    success: boolean;
    message: string;
    giftCardRequest: GiftCardRequestType | null;
};

export interface GiftCardModalProps {
    card: GiftCardDataType | null;
    isOpen: boolean;
    onClose: () => void;
}