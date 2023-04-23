import clsx from "clsx";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { OwnGameEditor } from "@components/gameEditor/OwnGameEditor";
import { OwnGameList } from "@components/gameEditor/OwnGameList";
import { Button } from "@components/util/Button";
import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { Game } from "@lib/firebase/firestoreTypes";
import { useOwnGameCollection } from "@lib/firebase/hooks/useOwnGameCollectionDataOnce";
import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";

const GamesPage: NextPage<AuthPageProps> = ({}: AuthPageProps) => {
    const router = useRouter();
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

    const createNewGame = () => router.push("/b/new");

    return (
        <>
            <div className="flex-grow bg-white text-black shadow-1 flex flex-row items-stretch">
                <div className="flex flex-col p-4 w-80 border-r-2">
                    {/* <h2 className="font-bold text-3xl">My Bingos</h2> */}
                    <OwnGameList
                        selectedId={selectedGameId}
                        defaultSelectionId={router.query.edit?.toString()}
                        onSelectionChange={setSelectedGameId}
                    />
                    <Button className="mb-0" onClick={createNewGame}>
                        +
                    </Button>
                </div>
                <div className="p-4 w-full max-w-2xl">
                    {selectedGameId && <OwnGameEditor key={selectedGameId} gameId={selectedGameId} />}
                </div>
                {/* <div className="p-2 flex-grow mr-auto">
                    <div></div>
                </div> */}
            </div>
            {/* <div className="mb-4 flex flex-row justify-between items-center">
                <div>
                    <h1 className="font-bold text-4xl">My Bingos</h1>
                </div>
                <div>
                    <Link href="/b/new">
                        <a>
                            <Button>New Bingo</Button>
                        </a>
                    </Link>
                </div>
            </div>

            <OwnGameList /> */}
        </>
    );
};

export default withAuth(GamesPage);
