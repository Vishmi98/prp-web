export type SessionDataType = {
    id: number;
    name: string;
    details: string;
    price: number;
    duration: string;
    isPublish?: boolean;
}

export type SessionType = {
    id: number;
    name: string;
    details: string;
    price: number;
    duration: string;
}

export type SessionsResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalSessions: number;
    sessions: SessionDataType[];
}

export type SessionsResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalSessions: number;
        sessions: SessionDataType[];
    }
}

export type CreateSessionResponseDataType = {
    success: boolean;
    message: string;
    data: {
        session: SessionType;
    }
}

export type CreateSessionResponseType = {
    success: boolean;
    message: string;
    data: SessionType;
}

export type PublishSessionResponseDataType = {
    success: boolean;
    message: string;
    data: SessionDataType;
}

export interface SessionRequestType {
    id: number;
    sessionId: number;
    fullName: string;
    email: string;
    phone: string;
    status: string;
}

export interface SessionRequestDataType {
    id: number;
    sessionId: number;
    fullName: string;
    email: string;
    phone: string;
    status: string;
    sessionInfo: SessionDataType;
}

export type SessionRequestsResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalRequests: number;
    requests: SessionRequestDataType[];
}

export type SessionRequestsResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalRequests: number;
        requests: SessionRequestDataType[];
    }
}

export type CreateSessionRequestPayload = {
    sessionId: number;
    fullName: string;
    email: string;
    phone: string;
};

export type CreateSessionRequestResponseType = {
    success: boolean;
    message: string;
    data?: {
        sessionRequest: SessionRequestType;
    };
};

export type CreateSessionRequestResponseDataType = {
    success: boolean;
    message: string;
    sessionRequest: SessionRequestType | null;
};

export type EditSessionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: SessionDataType | null;
}

export interface SessionModalProps {
    session: SessionDataType | null;
    isOpen: boolean;
    onClose: () => void;
}