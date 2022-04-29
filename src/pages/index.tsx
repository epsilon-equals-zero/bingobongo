import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import withLayout, { WITHOUT_BRANDING } from "@lib/hoc/withLayout";

const IndexPage: NextPage = () => {
    const router = useRouter();

    const [bingoCode, setBingoCode] = useState<string>("");
    const [hasError, setError] = useState<boolean>(false);

    const validateBingoCode = (c: string) => /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(c);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const code = e.target.value;

        setBingoCode(code);
    };
    const handleJoinClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!validateBingoCode(bingoCode)) setError(true);
        else router.push("/b/" + bingoCode);
    };

    return (
        <div className="relative flex flex-col flex-1 items-center justify-center">
            <div className="max-w-xs">
                <h1 className="mb-8 font-title text-center text-6xl select-none" style={{ lineHeight: 0.8 }}>
                    bingo
                    <br />
                    bongo
                </h1>
                <div className="p-4 rounded bg-white text-stone-800">
                    <form>
                        <input
                            placeholder="Bingo Code"
                            className={
                                "block border-2 rounded py-2 px-4 mb-1 text-center font-bold outline-none focus:border-stone-500 " +
                                (hasError ? "border-red-700" : "")
                            }
                            value={bingoCode}
                            onChange={handleCodeChange}
                        />
                        <button
                            className="block w-full rounded bg-stone-700 text-white p-2 font-bold"
                            onClick={handleJoinClick}
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>
            <p className="pt-4">
                Or{" "}
                <Link href="/b/new" passHref>
                    <a className="font-bold">create your own Bingo</a>
                </Link>
                !
            </p>
        </div>
    );
};

export default withLayout(WITHOUT_BRANDING, IndexPage);
