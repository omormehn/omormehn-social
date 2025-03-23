import { View, Text, Image } from 'react-native'
import React from 'react'
import { bg } from '@/constants/bg'
import AuthFormWrapper from './AuthFormWrapper'

interface AuthContainerProps {
    children: React.ReactNode;
    title?: string;
}

const AuthContainer = ({ children, title }: AuthContainerProps) => {
    return (
        <View>
            {/* Top Background Image Section*/}
            <View className='relative'>
                <Image source={bg.authBg} className='w-full' />
                <View className="absolute top-0 left-0 w-full h-56 bg-black opacity-30" />
                <Text className='absolute top-10 left-1/2  -translate-x-1/2 text-gray-400 font-medium text-2xl'>Omormehn</Text>
                <Text className='absolute top-36 left-1/2  -translate-x-1/2 text-white font-bold text-4xl'>{title}</Text>
            </View>

            <AuthFormWrapper>
                {children}
            </AuthFormWrapper>
        </View>
    )
}

export default AuthContainer