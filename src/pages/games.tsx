import React from "react";

import { OwnGameList } from "src/components/gameEditor/OwnGameList";
import { useRedirectToLogin } from "src/lib/firebase/hooks/useRedirectToLogin";

function Games() {
    const redirectToLogin = useRedirectToLogin();
    redirectToLogin();

    return (
        <>
            <OwnGameList />
        </>
    );
}

export default Games;
