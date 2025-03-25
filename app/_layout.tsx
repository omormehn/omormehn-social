import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';


export default function RootLayout() {
  
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(screens)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}