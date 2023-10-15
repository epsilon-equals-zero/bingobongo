import clsx from "clsx";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { Game } from "@lib/firebase/firestoreTypes";
import { useOwnGameCollection } from "@lib/firebase/hooks/useOwnGameCollectionDataOnce";

export interface OwnGameListProps {
    selectedId: string | null;
    defaultSelectionId?: string;

    onSelectionChange(gameId: string): void;
}

export function OwnGameList({ selectedId, defaultSelectionId, onSelectionChange }: OwnGameListProps) {
    const { data, loading, error, couldHaveMore, more } = useOwnGameCollection();

    console.log(data);

    useEffect(() => {
        if (!data || !!selectedId || !defaultSelectionId) return;

        const match = data.find((game) => game.id === defaultSelectionId);
        if (match) {
            onSelectionChange(match.id);
        }
    }, [data, selectedId, defaultSelectionId]);

    return (
        <>
            {loading ? (
                <div className="m-auto">
                    <LoadingSpinner size={60} />
                </div>
            ) : (
                <div className="mt-0 mb-auto overflow-y-auto">
                    {data?.map((game) => (
                        <div
                            key={game.id}
                            className={clsx(
                                "p-2 cursor-pointer",
                                game.id === selectedId ? "!bg-neutral-200" : "hover:bg-neutral-100"
                            )}
                            onClick={() => onSelectionChange(game.id)}
                        >
                            <span>{game.name}</span>
                            <span className="ml-2 text-xs text-neutral-400 font-mono">({game.id})</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
