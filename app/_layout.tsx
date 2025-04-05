import { Redirect, Stack } from 'expo-router';
import '../global.css';
import AuthContext, { AuthProvider, useAuth } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import SplashScreen from '@/components/SplashScreen';



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
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider >
  );
}