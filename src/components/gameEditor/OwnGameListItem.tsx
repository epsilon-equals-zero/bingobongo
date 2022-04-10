import { Link, Delete, Edit, PlayArrow, MoreHoriz } from "@mui/icons-material";
import {
    IconButton,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { MouseEvent, useState } from "react";

import { Game, WithRefPart } from "src/lib/firebase/firestoreTypes";

export interface OwnGameListItemProps {
    game: WithRefPart<Game>;
}

function SecondaryActionsMdUp() {
    return (
        <>
            <Tooltip title="Play">
                <IconButton>
                    <PlayArrow />
                </IconButton>
            </Tooltip>
            <Tooltip title="Copy Link">
                <IconButton>
                    <Link />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
                <IconButton>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton>
                    <Delete />
                </IconButton>
            </Tooltip>
        </>
    );
}

function SecondaryActionsSmDown() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Actions">
                <IconButton
                    onClick={handleOpen}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MoreHoriz />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <PlayArrow />
                    </ListItemIcon>
                    Play
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    Copy Link
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}

export function OwnGameListItem({ game }: OwnGameListItemProps) {
    const { breakpoints } = useTheme();
    const mdUp = useMediaQuery(breakpoints.up("md"));

    let categories = game.categories.join(", ");
    if (categories.length > 65) {
        categories = categories.substr(0, 63) + "...";
    }

    return (
        <ListItem
            key={game.id + "_item"}
            secondaryAction={mdUp ? <SecondaryActionsMdUp /> : <SecondaryActionsSmDown />}
        >
            <Stack direction="column">
                <Typography fontWeight="bold">{game.name}</Typography>
                <Typography fontSize="small">
                    Gamecode: {game.id}, Size: {game.size}x{game.size}, Categories: {categories}{" "}
                </Typography>
            </Stack>
        </ListItem>
    );
}
