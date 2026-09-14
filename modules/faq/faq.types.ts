export type FAQDataType = {
    id: number;
    question: string;
    answer: string;
    answer2?: string;
    answer3?: string;
    isPublish?: boolean;
};

export type FAQResponse = {
    success: boolean;
    message: string;
    data?: FAQDataType | { faq: FAQDataType };
};

export type FAQsResponse = {
    success: boolean;
    message: string;
    data?: {
        page?: number;
        limit?: number;
        totalPages?: number;
        totalFaqs?: number;
        faqs?: FAQDataType[];
    };
};

export type FAQFormValues = {
    id: number;
    question: string;
    answer: string;
    answer2?: string;
    answer3?: string;
};

export type EditFAQModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: FAQDataType | null;
};