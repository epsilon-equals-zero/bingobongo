import { collection, DocumentData, limit, orderBy, query, QuerySnapshot, where } from "@firebase/firestore";
import { useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "..";
import { Game, GameConverter, WithRefPart } from "../firestoreTypes";
import { useAuth } from "./useAuth";

export interface FirestorePaginationResult<T = DocumentData> {
    snapshot?: QuerySnapshot<T>;
    data?: Array<WithRefPart<T>>;
    loading: boolean;
    error?: Error;
    couldHaveMore: boolean;
    more: () => void;
}

const gameConverter = new GameConverter();

export const useOwnGameCollection = ({ pageSize = 10 } = {}): FirestorePaginationResult<Game> => {
    const { user, loading: userLoading } = useAuth();
    const [pages, setPages] = useState(1);

    const q = useMemo(() => {
        return query(
            collection(db, "games"),
            where("uid", "==", user?.uid || ""),
            orderBy("updatedAt"),
            limit(pageSize * pages)
        ).withConverter(gameConverter);
    }, [user, pageSize, pages]);

    const [snapshot, loading, error] = useCollection(q);

    const couldHaveMore = useMemo(() => {
        return snapshot ? snapshot.size == pageSize * pages : false;
    }, [snapshot, pageSize, pages]);

    const data = useMemo(() => {
        if (!snapshot) {
            return undefined;
        }
        return snapshot.docs.map((doc) => ({ ...doc.data(), refPath: doc.ref.path }));
    }, [snapshot]);

    const more = () => {
        if (couldHaveMore) {
            setPages(pages + 1);
        }
    };

    return {
        snapshot,
        data,
        loading: userLoading || loading,
        error,
        couldHaveMore,
        more,
    };
};
