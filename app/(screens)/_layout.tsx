import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function AppLayout() {
  const { session } = useAuth();

 
  if (!session) {
    console.log('Redirecting to /Login'); 
    return <Redirect href="/Login" />;
  }

  return <Slot />;
}