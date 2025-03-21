import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function AppLayout() {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  console.log('Session in AppLayout:', session);
  
  useEffect(() => {
    setIsLoading(false); 
  }, [session]);

  if (isLoading) {
    return null; 
  }
 
  if (!session) {
    console.log('Redirecting to /Login'); 
    return <Redirect href="/Login" />;
  }

  return <Slot />;
}