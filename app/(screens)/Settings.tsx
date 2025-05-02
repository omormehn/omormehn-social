import { View, Text, Button, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { bg } from '@/constants/bg';
import Icon from 'react-native-vector-icons/Feather'
import SettingOption from '@/components/SettingOption';
import { router } from 'expo-router';

const SettingScreen = () => {

    const { logout, user } = useAuth();
    
    return (
        <ImageBackground source={bg.darkBg} className='flex-1 flex-col gap-8' resizeMode='cover'>
            <View className='items-center'>
                <View style={styles.card} className='flex-row px-4 items-center gap-2'>
                    {/* profile picture */}
                    <Image source={bg.profile} style={{ width: 84, height: 80 }} />
                    {/* Name */}
                    <View>
                        <Text className='text-xl text-white font-semibold'>{user?.displayName}</Text>
                        <Text className=' text-shade'>{user?.email}</Text>
                    </View>
                    <TouchableOpacity className='absolute right-5 top-5' onPress={() => { router.push('/(screens)/EditProfile') }}>
                        <Icon name='edit' color={'white'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className='relative left-0 gap-6'>
                <SettingOption title='Email' />
                <SettingOption title='Instagram' />
                <SettingOption title='Twitter' />
                <SettingOption title='Website' />
                <SettingOption title='Change Password' />
                <SettingOption title='About Omormehn' />
                <SettingOption title='Terms & Privacy' />
            </View>
            {/* <Button onPress={logout} title='Logout' /> */}
            <TouchableOpacity className='ml-6' onPress={logout}>
                <View className='bg-white flex-row w-36 rounded-full py-3 px-6 items-center gap-2'>
                    <Icon name='log-out' size={23} />
                    <Text className='text-lg'>Log out</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: 100,
        width: 350,
        marginTop: 30,
        borderRadius: 13
    }
})
export default SettingScreen