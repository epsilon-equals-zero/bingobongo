import GithubIcon from "@mui/icons-material/GitHub";
import { Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

export function Footer() {
    return (
        <Box component="footer" py={2}>
            <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={14} color="GrayText">
                    Copyright &copy; {new Date().getFullYear()} Ian Hornik, Alexander Zach
                </Typography>
                <Typography fontSize={14} color="GrayText">
                    <Link href={config?.githubUrl} target="_blank" rel="noopener" color="inherit">
                        <GithubIcon />
                    </Link>
                </Typography>
            </Stack>
        </Box>
    );
}
