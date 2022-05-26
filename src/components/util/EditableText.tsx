import { useEffect, useState } from "react";

export interface EditableTextProps {
    value: string;

    onChange?: (value: string) => void;
}

export function EditableText({ value, onChange }: EditableTextProps) {
    const [internalValue, setInternalValue] = useState<string>("");

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    return (
        <span>
            <input
                className="py-2 px-3 rounded border border-white/50 bg-transparent outline-none focus:border-white w-full"
                style={{ font: "inherit" }}
                value={internalValue}
                onBlur={() => onChange?.(internalValue)}
                onChange={(v) => setInternalValue(v.target.value)}
                onKeyDown={(k) => {
                    if (k.key === "Enter") {
                        (k.target as HTMLInputElement).blur();
                    }
                }}
            />
        </span>
    );
}
