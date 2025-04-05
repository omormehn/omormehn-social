import { auth } from "@/services/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile, User } from 'firebase/auth'
import { router, useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

import { AuthContextType } from "@/types/types";
import { generateRandomUsername } from "@/utils/generateRandomUsername";
import { Alert, AppState } from "react-native";





const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const segments = useSegments();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
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
        if (loading) return;

        const inAuthGroup = segments?.[0] === '(tabs)'

        if (user) {
            if (!user?.emailVerified) {
                router.replace('/EmailVerification')
            } else if (!inAuthGroup) {
                router.replace('/(tabs)')
            }
        } else if (!user && inAuthGroup) {
            router.replace('/Login');
        }
    }, [user, loading]);



    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredentials.user);
        } catch (error) {
            setError(error);
            alert(error)
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
        } catch (error) {
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
        <AuthContext.Provider value={{ user, login, logout, error, register, loading, message }}>
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