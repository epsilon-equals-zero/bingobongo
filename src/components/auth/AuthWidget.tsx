import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { MdList as ListIcon, MdLogout as LogoutIcon } from "react-icons/md";
import { MdLogin as LoginIcon } from "react-icons/md";

import { LoadingSpinner } from "@components/util/LoadingSpinner";
import { useAuth } from "@lib/firebase/hooks/useAuth";
import { useOutsideAlerter } from "@lib/hooks/useOutsideAlerter";

function UserView() {
    const { user, signOut } = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const profileRef = useRef<HTMLDivElement | null>(null);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const redirectToGamesList = () => {
        router.push("/u/games");
        handleClose();
    };

    const menuItems = [
        { icon: ListIcon, label: "My Games", onClick: redirectToGamesList },
        { icon: LogoutIcon, label: "Logout", onClick: signOut },
    ];

    useOutsideAlerter(profileRef, handleClose);

    if (!user) return null;

    return (
        <div className="relative select-none" ref={profileRef}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer" onClick={handleOpen}>
                <Image
                    src={user.photoUrl || ""}
                    alt={user.name || user.email || ""}
                    layout="fill"
                    draggable={false}
                    unoptimized
                />
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute bg-white text-black top-11 w-40 right-0 rounded py-2"
                        initial={{ scale: 0, transformOrigin: "90% 0%" }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <ul>
                            {menuItems.map((m) => (
                                <li
                                    key={m.label}
                                    onClick={m.onClick}
                                    className="flex flex-row items-center px-3 py-1 hover:bg-black/10 cursor-pointer"
                                >
                                    <span className="mr-2">
                                        <m.icon />
                                    </span>
                                    <span>{m.label}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function AuthWidget() {
    const { user, loading } = useAuth();
    const router = useRouter();

    return (
        <div>
            {loading ? (
                <LoadingSpinner size={40} />
            ) : user ? (
                <UserView />
            ) : (
                <Link href={`/login?redirect=${encodeURI(router.asPath)}`}>
                    <a className="flex w-10 h-10 text-2xl">
                        <LoginIcon className="m-auto" />
                    </a>
                </Link>
            )}
        </div>
    );
}
