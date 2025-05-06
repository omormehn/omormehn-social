import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import SplashScreen from '@/components/SplashScreen';
import { AppContextProps } from '@/types/types';



const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
    const [hasSelectedCategory, setHasSelectedCategory] = useState(false);

    useEffect(() => {
        const checkFirstTime = async () => {
            const onboarding = await AsyncStorage.getItem("hasSeenOnboarding");
            const category = await AsyncStorage.getItem("hasSelectedCategory");

            setHasSeenOnboarding(!!onboarding);
            setHasSelectedCategory(!!category);
            setIsLoading(false);
        };

        checkFirstTime();
    }, []);

    if (loading || isLoading) return <SplashScreen />;

    if (!user) return <Redirect href="/Login" />;

    if (!user.emailVerified) return <Redirect href="/(auth)/EmailVerification" />;

    if (!hasSeenOnboarding) return <Redirect href="/Onboarding" />;

    if (!hasSelectedCategory) return <Redirect href="/(screens)/SelectCategory" />;

    return (
        <AppContext.Provider value={{ user, hasSeenOnboarding, hasSelectedCategory, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
