export interface CustomButton {
    size: "btn-sm" | "btn-md" | "btn-lg";
    color: "btn-primary" | "btn-secondary" | "btn-accent" | "btn-neutral" | "btn-warning" | "btn-error" | "btn-success";
    outline?: boolean;
    rounded?: "rounded-none" | "rounded-sm" | "rounded-md" | "rounded-lg" | "rounded-xl" | "rounded-2xl";
    block?: boolean;
    icon?: JSX.Element;
    iconPosition?: "left" | "right";
    loader?: boolean;
}