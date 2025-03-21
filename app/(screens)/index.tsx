import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    const { logout } = useAuth();
    return (
        <View>
            <Text>You are logged in</Text>
            <Button onPress={logout} title='logout' />
        </View>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
