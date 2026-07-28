export interface StoryDataType {
    id: number;
    clientName: string;
    treatmentName: string;
    comment: string;
    profileImagePath?: string;
    profileImageId?: string;
    rating: number;
    isPublish?: boolean;
}

export type StoriesResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalStories: number;
    successStories: StoryDataType[];
}

export type StoriesResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalStories: number;
        successStories: StoryDataType[];
    }
}

export type CreateStoryResponseDataType = {
    success: boolean;
    message: string;
    data: {
        successStory: StoryDataType;
    }
}

export type CreateStoryResponseType = {
    success: boolean;
    message: string;
    data: StoryDataType;
}

export type StoryResponseDataType = {
    success: boolean;
    message: string;
    data: StoryDataType
}

export type StoryResponseType = {
    success: boolean;
    message: string;
    successStory: StoryDataType | null;
}

export type PublishStoryResponseDataType = {
    success: boolean;
    message: string;
    data: StoryDataType;
}

export type EditStoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: StoryDataType | null;
}