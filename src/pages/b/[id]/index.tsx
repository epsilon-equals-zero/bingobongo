import { doc } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import sha1 from "sha1";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { PopUp } from "@components/util/Popup";
import { db } from "@lib/firebase";
import { Game, GameConverter } from "@lib/firebase/firestoreTypes";

const gameConverter = new GameConverter();

const generateGameDataAndSave = (game: Game | undefined, gameId: string | null) => {
    if (!game || !gameId) return null;

    const key = "data-" + gameId;
    const gameData = {
        gameHash: sha1(JSON.stringify(game, Object.keys(game).sort())),
        name: game.name,
        size: game.size,
        grid: game.categories
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, game.size ** 2),
        created: new Date(),
    };

    localStorage.setItem(key, JSON.stringify(gameData));

    return gameData;
};

const BingoPage: NextPage = () => {
    const [game, setGame] = useState<Game>();
    const [grid, setGrid] = useState<string[]>();
    const [regeneratePopupOpen, setRegeneratePopupOpen] = useState<boolean>(false);

    const router = useRouter();
    const gameId = router.query.id?.toString() || null;
    const documentRef = gameId ? doc(db, "games", gameId).withConverter(gameConverter) : null;
    const [snapshot, loading, error] = useDocument(documentRef);

    useEffect(() => {
        setGame(snapshot?.data());
    }, [snapshot]);

    useEffect(() => {
        if (!game) return;

        const key = "data-" + gameId;
        let gameData: {
            gameHash: string;
            name: string;
            size: number;
            grid: string[];
            created: Date;
        } | null = null;

        try {
            gameData = JSON.parse(localStorage.getItem(key) || "{}");
        } catch {}

        if (!gameData) {
            gameData = generateGameDataAndSave(game, gameId);
        }

        if (gameData?.gameHash != sha1(JSON.stringify(game, Object.keys(game).sort()))) {
            setRegeneratePopupOpen(true);
        }

        setGrid(gameData?.grid);
    }, [game, gameId]);

    if (loading) return <LoadingSpinner />;
    if (!game) return <div>Game not found.</div>;
    if (error || !grid) return <div>error</div>;

    return (
        <>
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
            <PopUp
                open={regeneratePopupOpen}
                title="Game changed"
                primaryBtnText="Yes"
                onPrimaryBtnClick={() => {
                    setRegeneratePopupOpen(false);
                    setGrid(generateGameDataAndSave(game, gameId)?.grid);
                }}
                secondaryBtnText="No"
                onSecondaryBtnClick={() => setRegeneratePopupOpen(false)}
                onClickBackground={() => setRegeneratePopupOpen(false)}
            >
                The game was changed by the admin. Do you want to generate a new grid?
            </PopUp>
        </>
    );
};

export default BingoPage;
