import SplashScreen from '@/components/SplashScreen';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';



const HomeScreen = () => {
    const { logout, user, loading } = useAuth();

    console.log(user)

    if(loading) {
        return <SplashScreen/>
    }



    return (
        <View>
            <Text>You are logged in {user.name}</Text>
            <Button onPress={logout} title='logout' />
        </View>
    );
}

export default HomeScreen;
