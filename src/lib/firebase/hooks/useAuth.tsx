import { User as FirebaseUser, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { auth, authProviders } from "..";

export interface AuthUser {
    uid: string;
    email: string | null;
    name: string | null;
    photoUrl: string | null;
    token: string | null;
}

export interface AuthContextData {
    user?: AuthUser;
    loading: boolean;
    error?: Error;
}

export interface AuthContextActions {
    signInWithGooglePopup: () => Promise<void>;
    signOut: () => Promise<void>;
}

export type AuthContext = AuthContextData & AuthContextActions;

const authContext = createContext<AuthContext>(null!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

const useProvideAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const setFirebaseUser = async (user: FirebaseUser) => {
        setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoUrl: user.photoURL,
            token: await user.getIdToken(),
        });
    };

    const signInWithGooglePopup = async () => {
        setLoading(true);
        try {
            setError(null);
            const response = await signInWithPopup(auth, authProviders.google);
            await setFirebaseUser(response.user);
        } catch (e) {
            setError(e as Error);
        }
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        await firebaseSignOut(auth);
        setUser(null);
        setLoading(false);
    };

    useEffect(() => {
        const authStateListener = async (authSate: FirebaseUser | null) => {
            if (!authSate) {
                setLoading(true);
                setUser(null);
                setError(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            await setFirebaseUser(authSate);
            setError(null);
            setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, authStateListener, setError);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        error,
        signInWithGooglePopup,
        signOut,
    } as AuthContext;
};

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
