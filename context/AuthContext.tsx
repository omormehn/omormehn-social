import React = require("react");
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

import { AuthContextType, CustomUser } from "@/types/types";
import { Session } from '@supabase/supabase-js'
import { supabase } from "@/services/supabase";



const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const segments = useSegments();

    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<CustomUser | null>(null);


    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.log("Error getting session", error);
                return;
            }
            setSession(data.session);
            if (data.session?.user) {
                const metadata = data.session?.user.user_metadata || {};
                setUser({
                    ...data.session?.user,
                    username: metadata.username || '',
                    avatar: metadata.avatar || ''
                });
            }
            setLoading(false);
        }

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user) {
                const metadata = session.user.user_metadata || {};
                updateUser({
                    ...session.user,
                    username: metadata.username || '',
                    avatar: metadata.avatar || ''
                });
            } else {
                setUser(null);
            }

        });

        return () => {
            listener?.subscription.unsubscribe();
        }
    }, []);

    const updateUser = (data: any) => {
        setUser(data);
    }


    useEffect(() => {
        if (!loading) {
            const inAuthGroup = segments[0] === "(tabs)" || "(screens)";


            if (!session && inAuthGroup) {
                router.replace("/(auth)/Login");
            }

            if (session) {
                if (!inAuthGroup) {
                    router.replace("/(tabs)");
                }
            }
        }
    }, [loading, session]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null)
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
                console.log("error in login", error.message)
                return { success: false, error }
            }
            router.replace('/(tabs)')
            return { success: true }
        } catch (error: any) {
            console.log("error in login", error)
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ session, loading, user, updateUser, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    )

}


const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}

export { useAuth }

export default AuthContext;