import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { IconType } from "react-icons";

interface ButtonClassNames {
    root?: string;
    shadow?: string;
    body?: string;
}

export interface ButtonBaseProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    classNames?: ButtonClassNames;
}

export function ButtonBase({ className, classNames = {}, children, type = "button", ...props }: ButtonBaseProps) {
    return (
        <button className={clsx("relative !outline-none", className, classNames.root)} type={type} {...props}>
            <span className={clsx("block absolute inset-0", classNames.shadow)}></span>
            <motion.span
                className={clsx("block relative", classNames.body)}
                animate={{ translateY: -4 }}
                whileHover={{ translateY: -2 }}
                whileTap={{ translateY: 0 }}
            >
                {children}
            </motion.span>
        </button>
    );
}

export type ButtonColorVariant = "success" | "error" | "dark" | "light";
export type ButtonSizeVariant = "small" | "normal" | "large";

export interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color?: ButtonColorVariant;
    size?: ButtonSizeVariant;
}

function colorToClasses(color: ButtonColorVariant): ButtonClassNames {
    switch (color) {
        case "success":
            return {
                root: "text-white",
                body: "bg-lime-500",
                shadow: "bg-lime-600",
            };
        case "error":
            return {
                root: "text-white",
                body: "bg-red-500",
                shadow: "bg-red-700",
            };
        case "light":
            return {
                root: "text-black",
                body: "bg-stone-300",
                shadow: "bg-stone-400",
            };

        case "dark":
        default:
            return {
                root: "text-white",
                body: "bg-stone-700",
                shadow: "bg-stone-800",
            };
    }
}
function sizeToClasses(size: ButtonSizeVariant): ButtonClassNames {
    switch (size) {
        case "small":
            return {
                root: "text-sm",
                body: "px-2 py-1",
            };
        case "large":
            return {
                root: "text-xl",
                body: "px-6 py-3",
            };

        case "normal":
        default:
            return {
                root: "text-base",
                body: "px-4 py-2",
            };
    }
}

export function Button({ color = "dark", size = "normal", children, ...props }: ButtonProps) {
    const colorClasses = colorToClasses(color);
    const sizeClasses = sizeToClasses(size);

    return (
        <ButtonBase
            classNames={{
                root: clsx(colorClasses.root, sizeClasses.root, "font-bold"),
                body: clsx(colorClasses.body, sizeClasses.body, "rounded"),
                shadow: clsx(colorClasses.shadow, sizeClasses.shadow, "rounded"),
            }}
            {...props}
        >
            {children}
        </ButtonBase>
    );
}

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
    icon: IconType;
}

export function IconButton({ color = "dark", size = "normal", icon: Icon, ...props }: IconButtonProps) {
    const colorClasses = colorToClasses(color);
    const sizeClasses = sizeToClasses(size);

    switch (size) {
        case "small":
            sizeClasses.body = "p-1";
            break;
        case "large":
            sizeClasses.body = "p-3";
            break;

        case "normal":
        default:
            sizeClasses.body = "p-2";
            break;
    }

    return (
        <ButtonBase
            classNames={{
                root: clsx(colorClasses.root, sizeClasses.root, "font-bold"),
                body: clsx(colorClasses.body, sizeClasses.body, "rounded-lg"),
                shadow: clsx(colorClasses.shadow, sizeClasses.shadow, "rounded-lg"),
            }}
            {...props}
        >
            <Icon />
        </ButtonBase>
    );
}
