import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '@/context/AuthContext';
import React, { useMemo, useRef } from 'react';
import { Text } from 'react-native';
import 'react-native-url-polyfill/auto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CommentContextProvider } from "@/context/CommentContext";
import CommentDrawer from "@/components/CommentDrawer";
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';





export default function RootLayout() {

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  return (
    <AuthProvider>
      <CommentContextProvider bottomSheetRef={bottomSheetRef}>
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
          <CommentDrawer bottomSheetRef={bottomSheetRef}/>
        </GestureHandlerRootView>
      </CommentContextProvider>
    </AuthProvider >
  );
}