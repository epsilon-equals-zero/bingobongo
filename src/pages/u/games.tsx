import type { NextPage } from "next";
import React from "react";

import { OwnGameList } from "@components/gameEditor/OwnGameList";
import withAuth, { AuthPageProps } from "@lib/hoc/withAuth";

const GamesPage: NextPage<AuthPageProps> = ({}: AuthPageProps) => {
    return (
        <>
            <OwnGameList />
        </>
    );
};

export default withAuth(GamesPage);
