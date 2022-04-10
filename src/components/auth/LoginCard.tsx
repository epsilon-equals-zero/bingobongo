import { Google } from "@mui/icons-material";
import { Card, CardContent, Typography, Stack, IconButton, Tooltip, CircularProgress } from "@mui/material";

import { useAuth } from "src/lib/firebase/hooks/useAuth";

export function LoginCard() {
    const { loading, error, signInWithGooglePopup } = useAuth();

    return (
        <Card sx={{ width: "400px", maxWidth: "90vw" }}>
            <CardContent>
                <Stack direction="column" alignItems="center">
                    <Typography variant="h4" pb="5px">
                        Login
                    </Typography>
                    <Typography color="red">{error?.message}</Typography>

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Stack direction="row">
                            <Tooltip title="Google">
                                <IconButton onClick={signInWithGooglePopup}>
                                    <Google />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
