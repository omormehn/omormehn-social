import { Redirect, Slot, useRouter } from 'expo-router';
import AuthContext, { AuthProvider, useAuth } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.css'


export default function AppLayout() {
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

  if(loading) return <SplashScreen/>


  if(isLoading) return null;

  if (!user) return <Redirect href="/Login" />;

  if (!hasSeenOnboarding) return <Redirect href="/Onboarding" />;

  // if (!hasSelectedCategory) return <Redirect href="/(screens)/SelectCategory" />;

  return <Slot />

}