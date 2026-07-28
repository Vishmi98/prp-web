export interface SocialLinks {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
}

export interface TeamDataType {
    id: number;
    title: string;
    firstName: string;
    lastName?: string;
    specialization: string;
    profileImagePath?: string;
    profileImageId?: string;
    socialLinks?: SocialLinks;
    isPublish?: boolean;
}

export type MembersResponseDataType = {
    success: boolean;
    message: string;
    page: number;
    limit: number;
    totalPages: number;
    totalMembers: number;
    teamMembers: TeamDataType[];
}

export type MembersResponseType = {
    success: boolean;
    message: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        totalMembers: number;
        teamMembers: TeamDataType[];
    }
}

export type CreateMemberResponseDataType = {
    success: boolean;
    message: string;
    data: {
        teamMember: TeamDataType;
    }
}

export type CreateMemberResponseType = {
    success: boolean;
    message: string;
    data: TeamDataType;
}

export type MemberResponseDataType = {
    success: boolean;
    message: string;
    data: TeamDataType
}

export type MemberResponseType = {
    success: boolean;
    message: string;
    teamMember: TeamDataType | null;
}

export type PublishMemberResponseDataType = {
    success: boolean;
    message: string;
    data: TeamDataType;
}

export type EditMemberModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadData: () => void;
    initialValues: TeamDataType | null;
}