import { motion } from "framer-motion";
import React from "react";

export type ButtonColorVariant = "success" | "error" | "plain";
export type ButtonSizeVariant = "normal" | "large";

export interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color?: ButtonColorVariant;
    size?: ButtonSizeVariant;
}

export function Button({
    color = "plain",
    size = "normal",
    children,
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    const { text, background, shadow } = colorToTailwind(color);
    const { fontSize, padding } = sizeToTailwind(size);

    return (
        <button className={`relative font-bold ${fontSize} ${text} !outline-none ` + className} type={type} {...props}>
            <span className={`block absolute inset-0 ${shadow} rounded`}></span>
            <motion.span
                className={`block relative ${padding} ${background} rounded -translate-y-1`}
                animate={{ translateY: -4 }}
                whileHover={{ translateY: -2 }}
                whileTap={{ translateY: 0 }}
            >
                {children}
            </motion.span>
        </button>
    );
}

function colorToTailwind(color: ButtonColorVariant): { text: string; background: string; shadow: string } {
    switch (color) {
        case "success":
            return { text: "text-white", background: "bg-lime-500", shadow: "bg-lime-600" };
        case "error":
            return { text: "text-white", background: "bg-red-500", shadow: "bg-red-700" };

        default:
            return { text: "text-white", background: "bg-stone-700", shadow: "bg-stone-800" };
    }
}
function sizeToTailwind(size: ButtonSizeVariant): { fontSize: string; padding: string } {
    switch (size) {
        case "large":
            return { fontSize: "text-xl", padding: "px-6 py-3" };
        default:
            return { fontSize: "text-base", padding: "px-4 py-2" };
    }
}
