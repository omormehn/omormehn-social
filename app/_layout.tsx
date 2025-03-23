import { Stack } from 'expo-router';
import '../global.css';
import { AuthProvider, useAuth } from '@/context/AuthContext';

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
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}