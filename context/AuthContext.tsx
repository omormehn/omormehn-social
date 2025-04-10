import { auth } from "@/services/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithCredential, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile, User } from 'firebase/auth'
import { router, useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

import { AuthContextType } from "@/types/types";
import { generateRandomUsername } from "@/utils/generateRandomUsername";
import { Alert, AppState } from "react-native";
import SplashScreen from "@/components/SplashScreen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";





const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const segments = useSegments();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);
    const [message, setMessage] = useState("");


    const onAuthStateChanged = (user: User | null) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null)
        }
        setLoading(false);
    }


    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
        return () => subscriber();
    }, []);


    useEffect(() => {
        const checkEmailVerificationStatus = async () => {
            if (auth.currentUser) {
                await auth.currentUser.reload();
                if (auth.currentUser.emailVerified) {
                    setUser(auth.currentUser);
                    router.replace('/(tabs)')
                }
            }
        }

        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                checkEmailVerificationStatus();
            }
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange)

        return () => subscription.remove();
    }, [])

    useEffect(() => {
        const checkAuth = () => {
            if (loading) return <SplashScreen />;

            const inAuthGroup = segments?.[0] === '(tabs)'

            if (!user && inAuthGroup) {
                router.replace('/Login');
            }
            if (user) {
                if (!user?.emailVerified) {
                    router.replace('/EmailVerification')
                } else if (!inAuthGroup) {
                    router.replace('/(tabs)')
                }
            }
        }
        checkAuth();
    }, [user, loading]);

    useEffect(() => {
        async function init() {
            const has = await GoogleSignin.hasPlayServices();
            if (has) {
                GoogleSignin.configure({
                    offlineAccess: true,
                    webClientId: '563459081987-bgoqn34814mavmqo34tlc9r9o5g71eh7.apps.googleusercontent.com'
                });
            }
        }
        init();
    }, []);

    const googleLogin = async () => {
        setIsLoading(true)
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Obtain the user's ID token
            const data: any = await GoogleSignin.signIn();
            

            // create a new firebase credential with the token
            const googleCredential = GoogleAuthProvider.credential(
                data?.data.idToken,
            );       

            await signInWithCredential(auth, googleCredential);
            return;
        } catch (error) {
            console.log('e: ', error);
            alert('Error')
        } finally {
            setLoading(false);
        }
    };



    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredentials.user);
        } catch (error: any) {
            setError(error);
            if (error.code === "auth/user-not-found") {
                alert("User not found")
            }
            if (error.code === 'auth/wrong-password') {
                alert('Incorrect password.');
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const register = async (email: string, password: string, confirmPassword: string) => {
        setLoading(true);
        try {
            if (password !== confirmPassword) {
                setError('Password do not match')
            }
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user

            const randomUsername = generateRandomUsername();
            if (auth.currentUser) {
                updateProfile(user, {
                    displayName: randomUsername
                })
            }

            await sendEmailVerification(user);

            setUser(user);
            Alert.alert('Success', "Verification email sent. Please check your inbox.");
            setMessage("Verification email sent. Please check your inbox.");


            router.replace('/(auth)/EmailVerification')
        } catch (error: any) {
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'Invalid email')
            }
            if (error.code === 'auth/weak-password') {
                Alert.alert('Error', 'Password must be at least 6 characters')
            }
            console.log("error in reg", error)
        } finally {
            setLoading(false);
            setError(null);
        }
    }
    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            router.replace('/Login')
        } catch (error) {
            console.log('Logout error:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, googleLogin, error, register, loading, isLoading, message }}>
            {children}
        </AuthContext.Provider>
    )

}


const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { useAuth }

export default AuthContext;