import { deleteDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { Modal } from "@components/util/Modal";
import { db } from "@lib/firebase";
import { Game } from "@lib/firebase/firestoreTypes";
import { useOwnGameCollection } from "@lib/firebase/hooks/useOwnGameCollectionDataOnce";

import { OwnGameListItem } from "./OwnGameListItem";

export function OwnGameList() {
    const { data, loading, error, couldHaveMore, more } = useOwnGameCollection();
    const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

    const deleteGame = (game: Game) => {
        deleteDoc(doc(db, "games", game.id))
            .catch(() => console.error("Failed to delete game from database."))
            .finally(() => setGameToDelete(null));
    };

    if (loading)
        return (
            <div className="flex flex-row justify-center items-center h-64">
                <LoadingSpinner size={64} />
            </div>
        );

    if (error || !data) return <div>An unexpected error occurred while loading games.</div>;

    return (
        <div className="text-black rounded overflow-hidden">
            <AnimatePresence>
                {data.map((game, i) => (
                    <motion.div
                        key={game.id}
                        initial={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0, transition: { delay: i * 0.05 } }}
                    >
                        <OwnGameListItem game={game} onDeleteClick={() => setGameToDelete(game)} />
                    </motion.div>
                ))}
            </AnimatePresence>

            {couldHaveMore && (
                <div className="p-2 flex flex-row justify-center items-center">
                    <div className="p-2 text-sm text-gray-400 font-bold cursor-pointer" onClick={more}>
                        Load more ...
                    </div>
                </div>
            )}

            <Modal
                open={!!gameToDelete}
                title="Delete game?"
                primaryBtnText="Delete"
                secondaryBtnText="Cancel"
                primaryBtnColor="error"
                onPrimaryBtnClick={() => gameToDelete && deleteGame(gameToDelete)}
                onSecondaryBtnClick={() => setGameToDelete(null)}
                onBackgroundClick={() => setGameToDelete(null)}
            >
                Do you really want to delete <b>{gameToDelete?.name}</b>? This action cannot be reversed.
            </Modal>
        </div>
    );
}
