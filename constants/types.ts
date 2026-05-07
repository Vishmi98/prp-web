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
