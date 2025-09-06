// Button.tsx

import type { ReactElement } from "react";

interface ButtonProps {
  variant: "Primary" | "Secondary" | "Warning";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  Primary:
    "bg-purple-600 text-white border border-purple-600 hover:bg-white hover:text-purple-600 transition-all duration-300 ease-in-out hover:scale-105",
  Secondary:
    "bg-purple-300 text-purple-600 border border-purple-600 hover:bg-white hover:text-purple-600 transition-all duration-300 ease-in-out hover:scale-105",
  Warning :
    "bg-red-600 text-white border border-black transition-all duration-300 ease-in-out hover:scale-105",
};

const defaultStyles = "rounded-md inline-flex mr-4 cursor-pointer";

const sizeStyles = {
  sm: "p-2",
  md: "p-4",
  lg: "p-8",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      }`}
    >
      <div className="flex items-center pr-1 pl-1">{props.startIcon}</div>
      <div className="font-medium text-sm">{props.text}</div>
      <div className="pr-2"></div>
      {props.endIcon}
    </button>
  );
};
