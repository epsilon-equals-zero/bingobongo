import { useEffect, useState } from "react";

export const useUrlPath = () => {
    const [urlPath, setUrlPath] = useState("");

    useEffect(() => {
        setUrlPath(window.location.href.replace(window.location.origin, ""));
    }, []);

    return urlPath;
};
