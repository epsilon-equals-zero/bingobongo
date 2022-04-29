import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { useAuth } from "@lib/firebase/hooks/useAuth";

const LoginPage: NextPage = () => {
    const router = useRouter();
    const { user } = useAuth();

    const { loading, error, signInWithGooglePopup } = useAuth();

    if (!!user) {
        router.push(router.query.redirect?.toString() || "/");
    }

    return (
        <div className="flex justify-center items-center m-auto">
            <div className="p-4 rounded bg-white text-stone-800">
                <div className="max-w-xs w-screen">
                    <div className="mb-4">
                        <h4 className="text-center font-bold text-2xl">Log in</h4>
                        <p className="text-red-500">{error?.message}</p>
                    </div>

                    {loading ? (
                        <div className="flex h-24">
                            <div className="m-auto">
                                <LoadingSpinner size={48} theme="dark" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button className="p-2 border rounded w-full" onClick={signInWithGooglePopup}>
                                Google
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
