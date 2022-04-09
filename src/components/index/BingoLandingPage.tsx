import { Button, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import getConfig from "next/config";

import { classNames } from "src/lib/helpers/classnames";
import { AuthBox } from "../auth/AuthBox";

import styles from "./BingoLandingPage.module.css";

const { publicRuntimeConfig: config } = getConfig();

export function BingoLandingPage() {
    return (
        <div className={classNames(styles.wrapper, styles.gradient135)}>
            <div className={styles.upperBall}></div>
            <div className={styles.lowerBall}></div>
            <AuthBox sx={{position: "absolute", top: "15px", right: {xs: "5vw", sm: "15px"}}} />

            <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <Typography variant="h2" display="inline-block">
                        {config?.title}
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Gamecode"
                        inputProps={{ style: { textAlign: "center" } }}
                    />
                    <Button variant="contained">Join</Button>
                    <Divider />
                    <Button variant="outlined">or create a new Game</Button>
                </CardContent>
            </Card>
        </div>
    );
}
