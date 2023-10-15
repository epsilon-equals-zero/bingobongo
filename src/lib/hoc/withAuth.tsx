import type { NextPage } from "next";
import React from "react";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { AuthUser, useAuth } from "@lib/firebase/hooks/useAuth";

export interface AuthPageProps {
    user: AuthUser;
}
export default function withAuth<P extends AuthPageProps>(PageComponent: NextPage<P>): NextPage<P> {
    const PageComponentWithAuth: React.FunctionComponent<P> = (props) => {
        const { user, loading } = useAuth({ required: true });
        return loading || !user ? (
            <div className="m-auto">
                <LoadingSpinner size={96} />
            </div>
        ) : (
            <PageComponent {...props} user={user} />
        );
    };

    return PageComponentWithAuth;
}
