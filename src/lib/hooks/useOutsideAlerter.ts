import React, { useEffect } from "react";

export function useOutsideAlerter(ref: React.RefObject<HTMLElement>, onClickOutside: (e: MouseEvent) => void) {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
                onClickOutside(e);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClickOutside]);
}
