import { LoadingSpinner } from "@components/LoadingSpinner";
import { useOwnGameCollection } from "@lib/firebase/hooks/useOwnGameCollectionDataOnce";

import { OwnGameListItem } from "./OwnGameListItem";

export function OwnGameList() {
    const { data, loading, error, couldHasMore, more } = useOwnGameCollection();

    if (loading)
        return (
            <div className="flex flex-row justify-center items-center h-64">
                <LoadingSpinner size={64} />
            </div>
        );

    if (error || !data) return <div>error loading games</div>;

    return (
        <div className="bg-white text-black rounded">
            {data.map((game) => (
                <OwnGameListItem key={game.id} game={game} />
            ))}
            {couldHasMore && (
                <div className="p-2 flex flex-row justify-center items-center">
                    <div className="p-2 text-sm text-gray-400 font-bold cursor-pointer" onClick={more}>
                        Load more ...
                    </div>
                </div>
            )}
        </div>
    );
}
