import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '@/context/AuthContext';
import React, { useMemo, useRef } from 'react';
import { Text } from 'react-native';
import 'react-native-url-polyfill/auto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';



const Tab = createBottomTabNavigator();

export default function RootLayout() {

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%'], []);

  return (
    <AuthProvider>
      <GestureHandlerRootView >
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
      </GestureHandlerRootView>
    </AuthProvider >
  );
}