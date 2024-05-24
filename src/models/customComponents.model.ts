export interface CustomButton {
    color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success";
    size?: "sm" | "md" | "lg";
    outline?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    block?: boolean;
    iconPosition?: "left" | "right";
    loader?: boolean;
    icon?: JSX.Element | null;
    className?: string;
}

export interface CustomBadge {
    color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success";
    size?: "sm" | "md" | "lg";
    outline?: boolean;
    iconPosition?: "left" | "right";
    icon?: JSX.Element | null;
    className?: string;
}

export interface CustomAvatar {
    color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success";
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
    status?: "online" | "offline"
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    className?: string;
    label?: {
        text: string;
        color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success";
        size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
        className?: string;
    }
}