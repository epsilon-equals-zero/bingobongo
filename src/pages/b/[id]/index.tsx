import { doc, getDoc } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";

import { LoadingSpinner } from "@components/LoadingSpinner";
import { db } from "@lib/firebase";
import { Game, GameConverter } from "@lib/firebase/firestoreTypes";

const gameConverter = new GameConverter();

const BingoPage: NextPage = () => {
    const [game, setGame] = useState<Game>();
    const [loading, setLoading] = useState<boolean>(true);
    const [grid, setGrid] = useState<string[]>();

    const router = useRouter();
    const gameId = router.query.id?.toString() || "";

    useEffect(() => {
        if (!gameId) return;

        getDoc(doc(db, "games", gameId)).then((docSnap) => {
            if (docSnap.exists()) {
                setLoading(false);
                setGame(gameConverter.fromFirestore(docSnap));
            } else {
                setLoading(false);
            }
        });
    }, [gameId]);

    useEffect(() => {
        if (!game) return;

        const key = "seed-" + gameId;
        const seed = localStorage.getItem(key) || new Date().getTime().toString();
        localStorage.setItem(key, seed);

        const rnd = seedrandom(seed);
        const count = game.size ** 2;
        setGrid(
            game.categories
                .slice()
                .sort(() => rnd() - 0.5)
                .slice(0, count)
        );
    }, [game, gameId]);

    if (loading) return <LoadingSpinner />;
    if (!game) return <div>Game not found.</div>;
    if (!grid) return <div>error</div>;

    return (
        <div className="">
            <h1 className="mb-4 font-title text-5xl text-center">{game.name}</h1>
            <div
                className="grid mx-auto gap-2"
                style={{
                    gridTemplateRows: `repeat(${game.size}, 1fr)`,
                    gridTemplateColumns: `repeat(${game.size}, 1fr)`,
                    maxWidth: "70vh",
                }}
            >
                {grid.map((g) => (
                    <div
                        key={g}
                        className="relative w-full bg-white text-black rounded"
                        style={{ paddingBottom: "100%" }}
                    >
                        <div className="absolute inset-0 flex justify-center items-center">{g}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BingoPage;
