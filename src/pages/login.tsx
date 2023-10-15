import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";

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
            <div className="p-4 bg-white text-stone-800 shadow-1">
                <div className="max-w-xs w-screen">
                    <div className="mb-4">
                        <h4 className="text-xl font-bold py-2 pr-6">Sign in to create and edit your own bingos.</h4>
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
                            <div
                                className="flex items-center p-2 w-full border-2 cursor-pointer uppercase tracking-wider text-sm font-bold text-neutral-500"
                                onClick={signInWithGooglePopup}
                            >
                                <span className="m-0">
                                    <GoogleIcon />
                                </span>
                                <span className="mx-auto">Continue with Google</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
