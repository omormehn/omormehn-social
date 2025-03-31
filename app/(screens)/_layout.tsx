import { Redirect, Slot, Stack, useRouter } from 'expo-router';
import AuthContext, { AuthProvider, useAuth } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.css'
import { Settings } from 'react-native';


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

  if (loading) return <SplashScreen />

  if (!user?.emailVerified) <Redirect href={'/(auth)/EmailVerification'} />


  if (isLoading) return null;

  if (!user) return <Redirect href="/Login" />;

  if (!hasSeenOnboarding) return <Redirect href="/Onboarding" />;

  // if (!hasSelectedCategory) return <Redirect href="/(screens)/SelectCategory" />;

  return (
    <Stack>
      <Stack.Screen name='[Settings]' options={{ headerTitle: 'Settings' }} />
    </Stack>

  )

}