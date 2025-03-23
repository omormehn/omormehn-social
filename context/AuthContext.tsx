import { account } from "@/services/appwriteConfig";
import { Redirect } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { ID } from "react-native-appwrite";



const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any | null>(null);
    const [session, setSession] = useState<any | null>(null);


    useEffect(() => {
        init();
    }, []);

    const init = () => {
        checkAuth();
    }

    const checkAuth = async () => {
        try {
            const responseSession = await account.getSession("current");
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.log(error)
            setSession(null)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
            const responseUser = account.get();
            setUser(responseUser);
            Redirect({ href: '/(screens)' })

        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const register = async (email: string, password: string, confirmPassword: string) => {

        setLoading(true);
        try {
            await account.createAnonymousSession();
            if (password !== confirmPassword) {
                setError('Password do not match')
            }
            const response = await account.create(ID.unique(), email, password)
            setUser(response);
        } catch (error) {
            console.log("error in reg", error)
        } finally {
            setLoading(false);
            setError(null);
        }
    }
    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            setSession(null);
        } catch (error) {
            console.log('Logout error:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, session, login, logout, error, register, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};




export default AuthContext;