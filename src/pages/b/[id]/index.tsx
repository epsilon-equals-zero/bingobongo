import { doc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import update, { Spec } from "immutability-helper";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { Modal } from "@components/util/Modal";
import { db } from "@lib/firebase";
import { Game, GameConverter } from "@lib/firebase/firestoreTypes";

const gameConverter = new GameConverter();

interface LocalGameState {
    name: string;
    size: number;
    grid: [string, boolean][];
    createdAt: number;
    updatedAt: number;
}

const BingoPage: NextPage = () => {
    const [game, setGame] = useState<Game | null>(null);
    const [gameState, setGameState] = useState<LocalGameState | null>(null);
    const [isRegeneratePopupOpen, setRegeneratePopupOpen] = useState<boolean>(false);

    const router = useRouter();
    const gameId = router.query.id?.toString() || null;

    const gameStorageKey = useMemo(() => "data-" + gameId, [gameId]);

    const documentRef = useMemo(
        () => (gameId ? doc(db, "games", gameId).withConverter(gameConverter) : null),
        [gameId]
    );
    const [snapshot, loading, error] = useDocument(documentRef);

    const generateLocalStateAndSave = useCallback(() => {
        // Generates a "blank" local game state from the remote game information and saves it.

        if (!game || !gameId) throw new Error();

        const localGameState: LocalGameState = {
            name: game.name,
            size: game.size,
            grid: game.categories
                .slice() // mutate
                .sort(() => Math.random() - 0.5) // shuffl
                .slice(0, game.size ** 2) // take as much as we need
                .map((c) => [c, false]),
            createdAt: game.createdAt.getTime(),
            updatedAt: game.updatedAt.getTime(),
        };

        localStorage.setItem(gameStorageKey, JSON.stringify(localGameState));

        return localGameState;
    }, [game, gameId, gameStorageKey]);

    const updateLocalStateAndSave = useCallback(
        (spec: Spec<LocalGameState | null>) => {
            // Applies a mutation to the local game state and then locally saves the changes.

            const localGameState = update(gameState, spec);
            localStorage.setItem(gameStorageKey, JSON.stringify(localGameState));
            setGameState(localGameState);

            // TODO: Check for bingo!
        },
        [gameState, gameStorageKey]
    );

    useEffect(() => {
        // If new data is available, load it into state.

        if (!snapshot) return;
        setGame(snapshot.data() || null);
    }, [snapshot]);

    useEffect(() => {
        // Once game state is available load it into local state.
        // If a local state already exists, the user will be prompted if they want to override it.

        if (!game) return;

        let localGameState: LocalGameState | null = null;

        try {
            localGameState = JSON.parse(localStorage.getItem(gameStorageKey) || "null");
        } catch {
            console.error("Malformed JSON detected in stored local game state.");
            localStorage.removeItem(gameStorageKey);
        }

        if (localGameState) {
            if (localGameState.updatedAt !== game.updatedAt.getTime()) {
                console.info(
                    "More recent game version found (%d (local) vs. %d (remote)).",
                    localGameState.updatedAt,
                    game.updatedAt.getTime()
                );
                setRegeneratePopupOpen(true);
            }
        } else {
            localGameState = generateLocalStateAndSave();
        }

        setGameState(localGameState);
    }, [game, gameStorageKey, generateLocalStateAndSave]);

    if (loading)
        return (
            <div className="flex flex-row justify-center items-center h-40">
                <LoadingSpinner />
            </div>
        );
    if (!game) return <div>Game not found.</div>;
    if (error || !gameState) return <div>An unexpected error occurred.</div>;

    return (
        <>
            <div className="">
                <h1 className="mb-4 font-title text-5xl text-center select-none">{gameState.name}</h1>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={gameState.size}
                        className="grid mx-auto gap-2"
                        style={{
                            gridTemplateRows: `repeat(${gameState.size}, 1fr)`,
                            gridTemplateColumns: `repeat(${gameState.size}, 1fr)`,
                            maxWidth: "70vh",
                        }}
                        initial={false}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -30 }}
                    >
                        {gameState.grid.map(([category, isChecked], i) => (
                            <BingoCard
                                key={i}
                                index={i}
                                category={category}
                                isChecked={isChecked}
                                onClick={() => {
                                    updateLocalStateAndSave({
                                        grid: {
                                            [i]: { $set: [category, !isChecked] },
                                        },
                                    });
                                }}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
            <Modal
                open={isRegeneratePopupOpen}
                title="Game changed"
                primaryBtnText="Yes"
                onPrimaryBtnClick={() => {
                    setRegeneratePopupOpen(false);
                    setGameState(generateLocalStateAndSave());
                }}
                secondaryBtnText="No"
                onSecondaryBtnClick={() => setRegeneratePopupOpen(false)}
                onBackgroundClick={() => setRegeneratePopupOpen(false)}
            >
                The remote game was changed by the admin. Do you want to generate a new grid? This will reset your
                progress.
            </Modal>
        </>
    );
};

export default BingoPage;

interface BingoCardProps {
    index: number;
    category: string;
    isChecked: boolean;

    onClick?(): void;
}
function BingoCard({ index, category, isChecked, onClick }: BingoCardProps) {
    return (
        <motion.div
            className={
                "relative w-full text-black rounded select-none pb-[100%] cursor-pointer " +
                (isChecked ? "bg-lime-300" : "bg-white")
            }
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0, transition: { delay: index * 0.02 } }}
            exit={{ opacity: 0, translateY: -10 }}
            whileHover={{
                scale: 1.1,
                boxShadow: "0px 0 16px -0px rgb(0, 0, 0, 0.25)",
                zIndex: 5,
            }}
            onClick={onClick}
        >
            <div className="absolute inset-0 flex justify-center items-center text-center p-3">{category}</div>
        </motion.div>
    );
}
