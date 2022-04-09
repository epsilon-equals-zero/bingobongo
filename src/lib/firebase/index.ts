import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { initializeApp, FirebaseOptions } from "firebase/app";

const FirebaseCredentials: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PULIC_FIREBASE_APP_ID
    }

const _app = initializeApp(FirebaseCredentials)

const _auth = getAuth()
_auth.useDeviceLanguage()

const _googleAuthProvider = new GoogleAuthProvider()

export const app = _app
export const auth = _auth
export const authProviders = {
    google: _googleAuthProvider
}