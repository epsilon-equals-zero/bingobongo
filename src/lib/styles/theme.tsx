import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { GlobalStyles, PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";

export function getTheme(mode: PaletteMode): Theme {
    return createTheme({
        palette: {
            mode,
            // https://material.io/resources/color/
        },
    });
}

export function ThemeProvider({ children }: React.PropsWithChildren<unknown>) {
    const theme = useMemo(() => getTheme("light"), []);

    return (
        <MuiThemeProvider theme={theme}>
            <GlobalStyles styles={{ body: { overflowY: "scroll" } }} />
            {children}
        </MuiThemeProvider>
    );
}
