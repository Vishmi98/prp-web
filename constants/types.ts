import { Method } from "axios";
import { ReactNode } from "react";

export type NavProps = {
    openNav: () => void;
}

export type MobileNavProps = {
    closeNav: () => void;
    showNav: boolean;
}

export type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "outline";
    className?: string;
};

export type ApiCallOptions = {
    url: string;
    method?: Method; // GET, POST, PUT, etc.
    body?: Record<string, unknown>;
    params?: Record<string, unknown>;
    isAuth?: boolean;
}

export type UserStoreUserType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    phoneNumber: string;
}

export type LoaderProps = {
    h?: number;
};

export type ProfileLink = {
    id: string;
    label: string;
    icon: ReactNode;
    href: string;
}

export type SidebarProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export type TableProps = {
    reload?: boolean;
    handleReload?: () => void;
}

export type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
};

export interface CropModalProps {
    imageFile: File;
    onCropComplete: (file: File) => void;
    onClose: () => void;
    cropWidth?: number;
    cropHeight?: number;
}

export type AddModalProps = {
    isOpen: boolean;
    onClose: () => void;
    handleReload: () => void;
}