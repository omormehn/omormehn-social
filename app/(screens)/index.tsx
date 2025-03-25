import AuthContainer from '@/components/AuthContainer';
import SplashScreen from '@/components/SplashScreen';
import AuthContext, { useAuth } from '@/context/AuthContext';
import { auth } from '@/services/firebaseConfig';
import { signOut } from "firebase/auth";
import { Redirect, useNavigation } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { BackHandler, Button, StyleSheet, Text, View } from 'react-native';



const HomeScreen = () => {
    const { user, loading } = useAuth();

    const navigation = useNavigation();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            return true;
        });

        return () => backHandler.remove();
    }, [])

    if(loading) {
        return <SplashScreen/>
    }



    return (
        <View>
            <Text>You are logged in {user?.email} </Text>
            <Button onPress={() => signOut(auth)} title='logout' />
        </View>
    );
}

export default HomeScreen;
