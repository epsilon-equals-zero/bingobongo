import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Button } from "@components/util/Button";
import withLayout, { WITHOUT_BRANDING } from "@lib/hoc/withLayout";
import Banner from "@public/banner-optimized.svg";

const IndexPage: NextPage = () => {
    const router = useRouter();

    const [bingoCode, setBingoCode] = useState<string>("");
    const [hasError, setError] = useState<boolean>(false);

    const validateBingoCode = (c: string) => /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(c);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let code = e.target.value;

        if (code.length > 9) {
            return;
        }
        if (code.length == 4 && bingoCode.length < 4) {
            code += "-";
        }
        if (code.length == 5 && code.charAt(4) != "-") {
            code = code.substring(0, 4) + "-" + code.substring(4);
        }

        setBingoCode(code);
    };
    const handleJoinClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!validateBingoCode(bingoCode)) {
            setError(true);
        } else {
            router.push("/b/" + bingoCode);
        }
    };

    return (
        <div className="relative flex flex-col flex-1 items-center justify-center">
            <div className="max-w-sm">
                <div className="p-4 bg-white text-stone-800 shadow shadow-1">
                    <div className="p-6 mb-2 select-none">
                        <Banner />
                    </div>
                    <motion.input
                        placeholder="Bingo Code"
                        className={
                            "block border-2 w-full py-2 px-4 mb-2 text-center font-bold outline-none focus:border-stone-500 " +
                            (hasError ? "border-red-700" : "")
                        }
                        value={bingoCode}
                        onChange={handleCodeChange}
                    />
                    <Button className="block w-full " onClick={handleJoinClick}>
                        Join
                    </Button>
                </div>
            </div>
            <p className="mt-6">
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
