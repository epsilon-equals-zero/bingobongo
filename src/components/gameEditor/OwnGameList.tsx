import { Button, CircularProgress, Divider, List, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useOwnGameCollection } from "src/lib/firebase/hooks/useOwnGameCollectionDataOnce";

import { OwnGameListItem } from "./OwnGameListItem";

export function OwnGameList() {
    const { data, loading, error, couldHasMore, more } = useOwnGameCollection();

    let content: JSX.Element;

    if (loading == true) {
        content = <CircularProgress size={80} />;
    } else if (data && data.length == 0) {
        content = <></>;
    } else if (data && data.length > 0) {
        content = (
            <>
                <Box flex="1">
                    <List>
                        <Divider />
                        {data.map((game) => (
                            <>
                                <OwnGameListItem key={game.id} game={game} />
                                <Divider key={game.id + "_divider"} />
                            </>
                        ))}
                    </List>
                    {couldHasMore ? (
                        <Button size="small" onClick={more}>
                            Load more
                        </Button>
                    ) : (
                        <Typography fontSize="small" color="gray">
                            no more games found
                        </Typography>
                    )}
                </Box>
            </>
        );
    } else {
        content = <Typography color="red">Error loading games: {error}</Typography>;
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">My Games</Typography>
                <Button size="small">Create new</Button>
            </Stack>
            <Box display="flex" justifyContent="center">
                {content}
            </Box>
        </Box>
    );
}
