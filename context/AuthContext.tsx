
import { router, useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

import { AuthContextType } from "@/types/types";
import { Session, User } from '@supabase/supabase-js'
import { supabase } from "@/services/supabase";


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const segments = useSegments();

    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.log("Error getting session", error);
                return;
            }
            setSession(data.session);
            setUser(data.session?.user!);
            setLoading(false);
        }

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user!);
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
            const inAuthGroup = segments?.[0] === "(tabs)" || "(screens)";

            if (!session && inAuthGroup) {
                router.replace("/(auth)/Login");
            }

            if (session) {
                if (!inAuthGroup) {
                    router.replace("/(tabs)");
                }
            }
        }
    })

    const logout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ session, loading, user, updateUser, logout }}>
            {children}
        </AuthContext.Provider>
    )

}


const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        console.log("Cannot be null");
    }
    return authContext;
}

export { useAuth }

export default AuthContext;