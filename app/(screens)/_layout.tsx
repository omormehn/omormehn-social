import { Redirect, Slot } from 'expo-router';
import AuthContext, { AuthProvider, useAuth } from '@/context/AuthContext';
import React, { useContext } from 'react';
import SplashScreen from '@/components/SplashScreen';

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />
  }


  if (!user) {
    console.log('Redirecting to /Login');
    return <Redirect href="/Login" />;
  }

  return <Slot />

}