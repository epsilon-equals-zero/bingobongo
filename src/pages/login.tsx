import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

import { LoginCard } from "src/components/auth/LoginCard";
import { useAuth } from "src/lib/firebase/hooks/useAuth";
import withLayout, { LAYOUT_WITHOUT_AUTHBOX } from "src/lib/helpers/layout";

function Login() {
    const { query, push } = useRouter();
    const { user } = useAuth();

    if (!!user) {
        push(query.redirect?.toString() || "/");
    }

    return (
        <Box display="flex" justifyContent="center">
            <LoginCard />
        </Box>
    );
}

export default withLayout(LAYOUT_WITHOUT_AUTHBOX, Login);
