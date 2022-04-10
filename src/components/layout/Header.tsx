import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import getConfig from "next/config";

import { AuthBox } from "../auth/AuthBox";

// import Image from "next/image";

export interface HeaderProps {
    showAuthBox: boolean;
}

const { publicRuntimeConfig: config } = getConfig();

export function Header({ showAuthBox = true }: HeaderProps) {
    return (
        <Box component="header" my={{ xs: 4, sm: 6 }}>
            <Stack direction="row" alignItems="flex-start">
                <Stack direction="row" alignItems="center" flex="1">
                    {/* <Box mx={2} sx={{ display: { xs: "none", sm: "block" } }}>
                        <Image src={PDFGroupLogo} alt="pdfgroup Logo" height={82} width={82} draggable="false" priority />
                    </Box> */}
                    <Box>
                        <Typography variant="h2" display="inline-block">
                            {config?.title}
                        </Typography>
                        <Typography variant="body2" ml={1} display="inline-block">
                            v{config?.version}
                        </Typography>
                        <Typography variant="body1">{config?.description}</Typography>
                    </Box>
                </Stack>
                {showAuthBox ? <AuthBox /> : null}
            </Stack>
        </Box>
    );
}
