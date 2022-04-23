import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { FooterContent } from "@components/layout/Footer";
import withLayout, { NO_LAYOUT } from "@lib/hoc/withLayout";

const IndexPage: NextPage = () => {
    const router = useRouter();

    const [bingoCode, setBingoCode] = useState<string>("");
    const [hasError, setError] = useState<boolean>(false);

    const validateBingoCode = (c: string) => c.length > 0 && c.length < 20 && /^.+$/.test(c);

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
        <main className="relative block w-screen h-screen">
            <div className="pointer-events-none -z-10">
                <div
                    className="fixed bg-black opacity-10 rotate-45"
                    style={{ top: "-15vmin", right: "-5vmin", minWidth: "75vmin", minHeight: "75vmin" }}
                ></div>
                <div
                    className="fixed bg-black opacity-10 rounded-full"
                    style={{ bottom: "-15vmin", left: "-5vmin", minWidth: "75vmin", minHeight: "75vmin" }}
                ></div>
            </div>

            <div className="relative flex flex-col h-full">
                <div className="m-auto max-w-xs">
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
                <footer className="max-w-5xl w-full mx-auto text-center py-4 select-none">
                    <p>
                        Or{" "}
                        <Link href="/b/new" passHref>
                            <a className="font-bold">create your own Bingo</a>
                        </Link>
                        !
                    </p>
                    <div className="grid grid-cols-3">
                        <FooterContent />
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default withLayout(NO_LAYOUT, IndexPage);
