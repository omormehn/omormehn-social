import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

const SettingScreen = () => {

    const { logout, user } = useAuth();
    console.log(user?.emailVerified)
    console.log(user?.email)

    return (
        <View>
            <Text>{user?.displayName}</Text>
            <Button onPress={logout} title='Logout' />
        </View>
    )
}

export default SettingScreen