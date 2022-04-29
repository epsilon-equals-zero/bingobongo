import { MouseEventHandler } from "react";

export interface ButtonProps {
    variant?: "contained" | "outlined";
    text?: string;
    onClick?: MouseEventHandler;
}

export function Button({ variant = "contained", text, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        px-6 py-2 ml-3
        border-2
        border-green
        ${variant == "contained" ? "bg-green" : "bg-white"}
        ${variant == "contained" ? "text-white" : "text-green"}
        font-medium
        text-xs
        uppercase
        rounded
        shadow-md
        hover:${variant == "contained" ? "bg-green-dark" : "bg-green-lighter"} hover:border-green-dark hover:shadow-lg
        focus:${
            variant == "contained" ? "bg-green-dark" : "bg-green-lighter"
        } focus:border-green-dark focus:shadow-lg focus:outline-none focus:ring-0
        active:${
            variant == "contained" ? "bg-green-darker" : "bg-green-light"
        } active:border-green-darker active:shadow-lg
        transition
        duration-150
        ease-in-out`}
        >
            {text}
        </button>
    );
}
