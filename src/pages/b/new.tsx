import { faker } from "@faker-js/faker";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

import { Button } from "@components/util/Button";
import { db } from "@lib/firebase";
import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";
import { gameIdGenerator } from "@lib/util/gameIdGenerator";

const NewBingo: NextPage<AuthPageProps> = ({ user }) => {
    const [name, setName] = useState<string>("");
    const [hasError, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const placeholder = useMemo(
        () =>
            faker.word.adjective(Math.floor(Math.random() * 6) + 4) +
            " " +
            faker.word.noun(Math.floor(Math.random() * 5) + 4),
        []
    );

    const validateName = (n: string) => n.length > 2 && n.length <= 20 && /^.+$/.test(n);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (loading) return;

        const name = e.target.value;
        setName(name);
        setError(!validateName(name));
    };
    const submit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (loading) return;

        if (validateName(name)) {
            setLoading(true);
            (async function () {
                const id = gameIdGenerator();
                await setDoc(doc(db, "games", id), {
                    categories: [],
                    createdAt: serverTimestamp(),
                    name: name,
                    size: 4,
                    uid: user.uid,
                    updatedAt: serverTimestamp(),
                });

                router.push(`/b/${id}/edit`);
            })();
        }
    };

    return (
        <div className="m-auto">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
            >
                <h1 className="mb-4 font-title text-5xl">Create a new bingo!</h1>
                <div className="flex flex-row space-x-2">
                    <input
                        className={
                            "py-3 px-5 bg-white/20 text-xl text-center font-bold color-white rounded outline-none focus:bg-white/40 placeholder:text-white/50 " +
                            (hasError ? "bg-red-300/20 text-red-300 focus:bg-red-300/40" : "")
                        }
                        value={name}
                        onChange={handleChange}
                        placeholder={placeholder || ""}
                    />
                    <Button size="large" onClick={submit}>
                        Go!
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default withAuth(NewBingo);
