import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '@/context/AuthContext';
import React, { useMemo, useRef } from 'react';
import { StatusBar, Text } from 'react-native';
import 'react-native-url-polyfill/auto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CommentContextProvider } from "@/context/CommentContext";
import CommentDrawer from "@/components/CommentDrawer";
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import LikeContextProvider from '@/context/LikeContext';
import { SocketContextProvider } from '@/context/SocketContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';





export default function RootLayout() {

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor={"translucent"} barStyle="dark-content" />

      <AuthProvider>
        <SocketContextProvider>
          <CommentContextProvider bottomSheetRef={bottomSheetRef}>
            <LikeContextProvider>
              <GestureHandlerRootView>
                <Stack>
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
                <CommentDrawer bottomSheetRef={bottomSheetRef} />
              </GestureHandlerRootView>
            </LikeContextProvider>
          </CommentContextProvider>
        </SocketContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}