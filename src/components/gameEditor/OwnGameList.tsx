import { motion, AnimatePresence } from "framer-motion";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { useOwnGameCollection } from "@lib/firebase/hooks/useOwnGameCollectionDataOnce";

import { OwnGameListItem } from "./OwnGameListItem";

export function OwnGameList() {
    const { data, loading, error, couldHaveMore, more } = useOwnGameCollection();

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
                        <OwnGameListItem game={game} />
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
        </div>
    );
}
