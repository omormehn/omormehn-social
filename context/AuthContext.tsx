import { account } from "@/services/appwriteConfig";
import { Redirect } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthContextType {
    user: any | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    session: any | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any | null>(null);


    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await account.deleteSession('current');
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
            const responseUser = account.get();
            setUser(responseUser);
            Redirect({ href: '/(screens)' })

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
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
        <AuthContext.Provider value={{ user, session, login, logout }}>
            {loading ? (
                <SafeAreaView>
                    <ActivityIndicator
                        size={30}
                    />
                </SafeAreaView>
            ) : (
                children
            )}
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