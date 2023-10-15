import clsx from "clsx";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import update, { Spec } from "immutability-helper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";

import { Button } from "@components/util/Button";
import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { db } from "@lib/firebase";
import { Game, GameConverter } from "@lib/firebase/firestoreTypes";
import { range } from "@lib/util/collections";

export interface OwnGameEditorProps {
    gameId: string;
}

const gameConverter = new GameConverter();

export function OwnGameEditor({ gameId }: OwnGameEditorProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<Game | null>(null);

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
        (spec: Spec<Omit<Game, "createdAt" | "updatedAt">>) => {
            if (!game) throw new Error();

            const updatedGame = update<Game>(game, {
                ...spec,
                updatedAt: { $set: new Date() },
            });

            setDoc(docRef, gameConverter.toFirestore(updatedGame));
            setGame(updatedGame);
        },
        [docRef, game]
    );

    if (loading)
        return (
            <div className="flex w-full h-full">
                <div className="m-auto">
                    <LoadingSpinner size={60} />
                </div>
            </div>
        );
    if (!game) return <div>Game not found.</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label className="block text-lg font-bold">Bingo Name</label>
                    <input
                        type="text"
                        className="border-2 py-2 px-3 text-xl"
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
                                className={clsx(
                                    "bg-white py-1 px-3 cursor-pointer border-2",
                                    game.size === s
                                        ? "bg-red-500 text-white font-bold border-transparent"
                                        : "bg-none text-black"
                                )}
                                onMouseDown={() => {
                                    if (game.size !== s) {
                                        updateGame({ size: { $set: s } });
                                    }
                                }}
                                // initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileTap={{ scale: 0.8 }}
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
                                        className="flex-grow border-2 py-1 px-2"
                                        defaultValue={c}
                                        onBlur={(e) => {
                                            const value = e.target.value;
                                            if (game.categories[i] !== value) {
                                                updateGame({ categories: { [i]: { $set: e.target.value } } });
                                            }
                                        }}
                                    />
                                    <motion.button
                                        type="button"
                                        tabIndex={-1}
                                        className="rounded flex items-center justify-center w-8 ml-1 text-red-500 text-xl !outline-none"
                                        onClick={() => updateGame({ categories: { $splice: [[i, 1]] } })}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                    >
                                        <MdDelete />
                                    </motion.button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                        <li className="mt-2 pl-9 pr-9">
                            <Button
                                type="button"
                                color="dark"
                                size="small"
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

            <pre className="mt-32 text-xs">
                <code>{JSON.stringify(game, null, 2)}</code>
            </pre>
        </motion.div>
    );
}
