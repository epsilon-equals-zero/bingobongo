import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { GlobalStyles, PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";

export function getTheme(mode: PaletteMode): Theme {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: "#20bf55",
            },
            secondary: {
                main: "#0b4f6c",
            },
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
