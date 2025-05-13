import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';
import 'react-native-url-polyfill/auto';



export default function RootLayout() {



  return (
    <AuthProvider>
      <Stack >
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
        />

      </Stack>
    </AuthProvider >
  );
}