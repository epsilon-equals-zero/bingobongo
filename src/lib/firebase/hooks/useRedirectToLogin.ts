import { useRouter } from "next/router";

import { useUrlPath } from "src/lib/helpers/hooks/useUrlPath";

import { useAuth } from "./useAuth";

export const useRedirectToLogin = () => {
    const { user, loading } = useAuth();
    const { push } = useRouter();
    const urlPath = useUrlPath();

    return () => {
        if (!loading && !user) {
            push(`/login?redirect=${urlPath}`);
        }
    };
};
