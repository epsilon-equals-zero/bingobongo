import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { OwnGameList } from "@components/gameEditor/OwnGameList";
import { Button } from "@components/util/Button";
import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";

const GamesPage: NextPage<AuthPageProps> = ({}: AuthPageProps) => {
    return (
        <>
            <div className="mb-4 flex flex-row justify-between items-center">
                <div>
                    <h1 className="font-title text-4xl">My Bingos</h1>
                </div>
                <div>
                    <Link href="/b/new">
                        <a>
                            <Button>New Bingo</Button>
                        </a>
                    </Link>
                </div>
            </div>

            <OwnGameList />
        </>
    );
};

export default withAuth(GamesPage);
