import { auth } from "@/services/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { router, useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

import { AuthContextType } from "@/types/types";


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const segments = useSegments();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);
    const [message, setMessage] = useState("");

    const onAuthStateChanged = (user: User | null) => {
        if(user) {
        setUser(user);

        }
        if (loading) setLoading(false);
    }


    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
        return () => subscriber();
    }, []);

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === '(tabs)'

        if (user && !inAuthGroup && user?.emailVerified) {
            router.replace('/(tabs)')
        } else if (!user && inAuthGroup) {
            router.replace('/Login')
        } else if(user && !user.emailVerified) {
            router.replace('/EmailVerification')
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
            setLoading(false)
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
            setUser(user);
            await sendEmailVerification(user);
            alert("Verification email sent. Please check your inbox.");
            setMessage("Verification email sent. Please check your inbox.");
            router.push('/(auth)/EmailVerification')
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