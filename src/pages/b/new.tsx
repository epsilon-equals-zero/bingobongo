import { faker } from "@faker-js/faker";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

import { db } from "@lib/firebase";
import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";

const NewBingo: NextPage<AuthPageProps> = ({ user }) => {
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const placeholder = useMemo(() => faker.word.adjective() + " " + faker.word.noun(), []);

    const validateName = (n: string) => n.length > 2 && n.length <= 20 && /^.+$/.test(n);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const submit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (loading) return;

        if (!validateName(name)) setError(true);
        else {
            setLoading(true);
            (async function () {
                const id = nanoid(8);
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
            <div className="flex flex-col items-center">
                <h1 className="mb-2 font-title text-5xl">Create a new bingo</h1>
                <div>
                    <form className="flex flex-row space-x-2">
                        <input
                            className="py-3 px-5 bg-white/20 text-xl text-center font-bold color-white rounded outline-none focus:bg-white/40 placeholder:text-white/50"
                            value={name}
                            onChange={handleChange}
                            placeholder={placeholder || ""}
                        />
                        <button
                            className="py-3 px-4 text-xl font-bold bg-gray-800 rounded cursor-pointer select-none"
                            onClick={submit}
                        >
                            Go!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withAuth(NewBingo);
