import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';



export const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    appDomain: process.env.EXPO_PUBLIC_FIREBASE_APP_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messageSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!
}

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const storage = getStorage(app);
export const db = getFirestore(app);

