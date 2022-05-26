import { doc, getDoc, setDoc } from "firebase/firestore";
import update from "immutability-helper";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { MdEdit as EditIcon } from "react-icons/md";

import { EditableText } from "@components/util/EditableText";
import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { db } from "@lib/firebase";
import { Game, GameConverter } from "@lib/firebase/firestoreTypes";
import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";
import { range } from "@lib/util/collections";

const gameConverter = new GameConverter();

const EditBingoPage: NextPage<AuthPageProps> = ({ user }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<Game>();

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

    const updateGame = (g: Game) => {
        g = update(g, {
            updatedAt: { $set: new Date() },
        });

        setDoc(docRef, gameConverter.toFirestore(g));
        setGame(g);
    };

    if (loading) return <LoadingSpinner />;
    if (!game) return <div>Game not found.</div>;
    if (game.uid !== user.uid) return <div>Unauthorized.</div>;

    return (
        <div>
            <div className="mb-2 text-4xl font-bold">
                <EditableText text={game.name} />
                {/* <h1 className="text-5xl font-title">{game.name}</h1>
                <div className="text-3xl opacity-50">
                    <EditIcon />
                </div> */}
            </div>

            <div className="mb-2">
                <label>Board Size:</label>
                <div className="flex flex-row space-x-1">
                    {range(4, 8).map((s) => (
                        <div
                            key={s}
                            className={`bg-white py-1 px-3 text-black ${
                                game.size === s ? "opacity-100" : "opacity-50"
                            } rounded hover:opacity-100 hover:cursor-pointer`}
                            onClick={() => updateGame(update(game, { size: { $set: s } }))}
                        >
                            {s}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                {game.categories.map((c) => (
                    <div key={c}>{c}</div>
                ))}
            </div>

            <pre className="mt-32">
                <code>{JSON.stringify(game, null, 2)}</code>
            </pre>
        </div>
    );
};

export default withAuth(EditBingoPage);
