import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import update, { Spec } from "immutability-helper";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";

import { Button } from "@components/util/Button";
import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { db } from "@lib/firebase";
import { Game, GameConverter } from "@lib/firebase/firestoreTypes";
import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";
import { range } from "@lib/util/collections";

const gameConverter = new GameConverter();

const EditBingoPage: NextPage<AuthPageProps> = ({ user }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<Game | null>(null);

    const router = useRouter();
    const gameId = router.query.id?.toString() || "";
    const docRef = useMemo(() => doc(db, "games", gameId), [gameId]);

    useEffect(() => {
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setLoading(false);
                setGame(gameConverter.fromFirestore(docSnap));
            } else {
                setLoading(false);
            }
        });
    }, [docRef]);

    const updateGame = useCallback(
        (spec: Spec<Game>) => {
            if (!game) throw new Error();

            const updatedGame = update(game, {
                ...spec,
                updatedAt: { $set: new Date() },
            });

            setDoc(docRef, gameConverter.toFirestore(updatedGame));
            setGame(updatedGame);
        },
        [docRef, game]
    );

    if (loading) return <LoadingSpinner />;
    if (!game) return <div>Game not found.</div>;
    if (game.uid !== user.uid) return <div>Unauthorized.</div>;

    return (
        <div>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label className="block text-lg font-bold">Bingo Name</label>
                    <input
                        type="text"
                        className="bg-white/20 rounded py-2 px-3 text-xl"
                        value={game.name}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (game.name !== value) {
                                updateGame({ name: { $set: e.target.value } });
                            }
                        }}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="block text-lg font-bold">Board Size</label>
                    <div className="flex flex-row space-x-1">
                        {range(4, 8).map((s) => (
                            <motion.button
                                key={s}
                                type="button"
                                tabIndex={0}
                                className={`bg-white py-1 px-3 rounded cursor-pointer ${
                                    game.size === s ? "bg-white text-black font-bold" : "bg-white/20 text-white"
                                }`}
                                onClick={() => {
                                    if (game.size !== s) {
                                        updateGame({ size: { $set: s } });
                                    }
                                }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.2 }}
                            >
                                {s}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="block text-lg font-bold">Categories</label>
                    <ol className="my-2">
                        <AnimatePresence>
                            {game.categories.map((c, i) => (
                                <motion.li
                                    key={i}
                                    className="mb-1 flex flex-row"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <span className="text-center w-8 mr-1">{i + 1}.</span>
                                    <input
                                        type="text"
                                        className="flex-grow bg-white/20 rounded py-1 px-2"
                                        defaultValue={c}
                                        onBlur={(e) => {
                                            const value = e.target.value;
                                            if (game.categories[i] !== value) {
                                                updateGame({ categories: { [i]: { $set: e.target.value } } });
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="rounded flex items-center justify-center w-8 ml-1 text-red-400 text-xl"
                                        onClick={() => updateGame({ categories: { $splice: [[i, 1]] } })}
                                    >
                                        <MdDelete />
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                        <li className="mt-2 pl-9 pr-9">
                            <Button
                                type="button"
                                color="success"
                                className="w-full"
                                onClick={() => updateGame({ categories: { $push: [""] } })}
                            >
                                Add Category
                            </Button>
                        </li>
                    </ol>
                </div>

                {/* <label>Options</label> */}
            </form>

            <pre className="mt-32">
                <code>{JSON.stringify(game, null, 2)}</code>
            </pre>
        </div>
    );
};

export default withAuth(EditBingoPage);
