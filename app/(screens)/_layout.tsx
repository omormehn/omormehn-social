import { Redirect, Slot, Stack, useRouter } from 'expo-router';
import AuthContext, { AuthProvider, useAuth } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.css'
import { Settings } from 'react-native';


export default function AppLayout() {


 

  // if (!hasSelectedCategory) return <Redirect href="/(screens)/SelectCategory" />;

  return (
    <Stack>
      <Stack.Screen name='Settings'  options={{ headerShown: false,  }} />
      <Stack.Screen name='EditProfile'  options={{ headerShown: false,  }} />
    </Stack>

  )

}