import copy from "clipboard-copy";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
    MdDelete as DeleteIcon,
    MdEdit as EditIcon,
    MdLink as LinkIcon,
    MdList as ListIcon,
    MdPlayArrow as PlayIcon,
} from "react-icons/md";

import { Game, WithRefPart } from "@lib/firebase/firestoreTypes";

export interface OwnGameListItemProps {
    game: WithRefPart<Game>;

    onDeleteClick?(): void;
}

export function OwnGameListItem({ game, onDeleteClick }: OwnGameListItemProps) {
    const router = useRouter();

    let categories = game.categories.join(", ");
    if (categories.length > 65) {
        categories = categories.substring(0, 64) + "...";
    }

    const actions = [
        { icon: PlayIcon, onClick: () => router.push(`/b/${game.id}`) },
        {
            icon: LinkIcon,
            onClick: () => {
                copy(window.origin + "/b/" + game.id)
                    .then(() => toast.success("Bingo link copied to clipboard!"))
                    .catch(() => toast.error("Copying game link failed."));
            },
        },
        { icon: EditIcon, onClick: () => router.push(`/b/${game.id}/edit`) },
        { icon: DeleteIcon, onClick: () => onDeleteClick?.() },
    ];

    return (
        <div className="flex flex-row px-6 py-3 bg-white border-b items-center">
            <div>
                <div>
                    <span className="font-bold text-green-800">{game.name}</span>
                    <span className="ml-2 text-sm text-gray-400">({game.id})</span>
                </div>
                <div>
                    <span>
                        <span className="inline-block mr-1 align-middle">
                            <ListIcon />
                        </span>
                        <span className="text-sm">
                            Categories: <span className="text-gray-600">{categories}</span>
                        </span>
                    </span>
                </div>
            </div>
            <div className="mr-0 ml-auto">
                <div className="flex flex-row space-x-1">
                    {actions.map((a, i) => (
                        <div
                            key={i}
                            className="text-lg p-2 rounded-full cursor-pointer hover:bg-gray-200"
                            onClick={a.onClick}
                        >
                            <a.icon />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
