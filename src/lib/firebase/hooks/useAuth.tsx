import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { User as FirebaseUser, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth"
import { auth, authProviders } from ".."

export interface AuthUser {
    uid: string;
    email: string | null;
    name: string | null;
    photoUrl: string | null;
    token: string | null;
}

export interface AuthContextData {
    user?: AuthUser
    loading: boolean
}

export interface AuthContextActions {
    signInWithGooglePopup: () => Promise<void>
    signOut: () => Promise<void>
}

export type AuthContext = AuthContextData & AuthContextActions

const authContext = createContext<AuthContext>(null!)

const useProvideAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const setFirebaseUser = async (user: FirebaseUser) => {
        setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoUrl: user.photoURL,
            token: await user.getIdToken()
        })
    }

    const authStateListener = async (authSate: FirebaseUser | null) => {
        if (!authSate) {
            setLoading(true)
            setUser(null)
            setLoading(false)
            return;
        }
        
        setLoading(true)
        await setFirebaseUser(authSate)
        setLoading(false)
    }

    const signInWithGooglePopup = async () => {
        setLoading(true)
        const response = await signInWithPopup(auth, authProviders.google)
        await setFirebaseUser(response.user)
        setLoading(false)
    }

    const signOut = async () => {
        setLoading(true)
        await firebaseSignOut(auth)
        setUser(null)
        setLoading(false)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateListener)
        return () => unsubscribe()
    })

    return {
        user,
        loading,
        signInWithGooglePopup,
        signOut

    } as AuthContext
}

export const AuthProvider = ({children} : PropsWithChildren<unknown>) => {
    const auth = useProvideAuth()
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)