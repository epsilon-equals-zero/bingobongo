import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { MdEdit as EditIcon } from "react-icons/md";

import { LoadingSpinner } from "@components/LoadingSpinner";
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

    useEffect(() => {
        getDoc(doc(db, "games", gameId)).then((docSnap) => {
            if (docSnap.exists()) {
                setLoading(false);
                setGame(gameConverter.fromFirestore(docSnap));
            } else {
                setLoading(false);
            }
        });
    }, [gameId]);

    if (loading) return <LoadingSpinner />;
    if (!game) return <div>Game not found.</div>;
    if (game.uid !== user.uid) return <div>Unauthorized.</div>;

    return (
        <div>
            <div className="flex flex-row items-center space-x-4">
                <h1 className="text-5xl font-title">{game.name}</h1>
                <div className="text-3xl opacity-50">
                    <EditIcon />
                </div>
            </div>

            <div className="flex flex-row space-x-1">
                {range(4, 8).map((s) => (
                    <div
                        key={s}
                        className={`bg-white py-1 px-3 text-black ${
                            game.size === s ? "opacity-100" : "opacity-50"
                        } rounded`}
                    >
                        {s}
                    </div>
                ))}
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
