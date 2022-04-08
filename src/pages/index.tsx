import React from "react";

import { BingoLandingPage } from "src/components/index/BingoLandingPage";
import withLayout, { NO_LAYOUT } from "src/lib/helpers/layout";

function Index() {
    return (
        <>
            <BingoLandingPage />
        </>
    );
}

export default withLayout(NO_LAYOUT, Index)