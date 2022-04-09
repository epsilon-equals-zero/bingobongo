import { Login, Logout } from "@mui/icons-material";
import { Avatar, CircularProgress, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Theme } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import { MouseEvent, useState } from "react";
import { useAuth } from "src/lib/firebase/hooks/useAuth";

// import Image from "next/image";

function UserView() {
    const { user, signOut } = useAuth()
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Tooltip title="Account Options">
                <IconButton onClick={handleOpen} size="small" aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    <Avatar sx={{ width: 32, height: 32 }} src={user?.photoUrl || ""} alt={user?.name || user?.email || ""} />
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
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={signOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export function AuthBox({sx, ...props}: BoxProps) {
    const { user, loading, signInWithGooglePopup } = useAuth()

    return (
        <Box {...props} sx={{...sx, display: "flex", justifyContent: "flex-end"}}>
            {loading
                ? (<CircularProgress />)
                :  user
                    ? (<UserView />)
                    : (<Tooltip title="Login">
                            <IconButton onClick={signInWithGooglePopup}><Login sx={{ width: 32, height: 32, color: (theme: Theme) => theme.palette.primary.main }}/></IconButton>
                       </Tooltip>)
            }
        </Box>
    );
}
