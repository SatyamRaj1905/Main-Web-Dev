// Button.tsx

import type { ReactElement } from "react";

interface ButtonProps {
    variant: "Primary" | "Secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const variantStyles = {
    Primary: "bg-purple-600 text-white",
    Secondary: "bg-purple-300 text-purple-600",
};

const defaultStyles = "rounded-md inline-flex mr-4";

const sizeStyles = {
    sm: "p-1",
    md: "p-4",
    lg: "p-6",
};

export const Button = (props: ButtonProps) => {
    return (
        <button
            className={`${variantStyles[props.variant]} ${defaultStyles} ${
                sizeStyles[props.size]
            }`}
        >
            <div className="flex items-center pr-1 pl-1">{props.startIcon}</div>
            <div className="font-medium text-sm">{props.text}</div>
            <div className="pr-2"></div>{props.endIcon}
        </button>
    );
};
