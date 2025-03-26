import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { AuthVerificationProps } from '@/types/types'
import { LinearGradient } from 'expo-linear-gradient'
import { EmailContainer } from './InputContainer'
import AuthButton from './AuthButton'
import { bg } from '@/constants/bg'

const AuthVerificationContainer = ({ title, description, children, onpress, loading, name }: AuthVerificationProps) => {


    return (
        <View className='justify-center  items-center gap-8 pt-4'>
            <Text style={{}}
                className='font-bold text-lg text-secondary '>
                {title}
            </Text>

            {/* Description */}
            <View className='bg-primaryBg w-[90%] px-10 py-4 rounded-2xl'>
                <Text className='text-center text-lg font-medium '>{description}</Text>
            </View>

            <View className='w-[90%] pt-2'>
                {children}


                {/* Button */}
                <View className='pt-20'>
                    <AuthButton title={name} onpress={onpress} loading={loading} />
                </View>

                <View className='pt-8 items-center'>
                    <Image source={bg.authBottomImg} />
                </View>
            </View>

        </View>
    )
}

export default AuthVerificationContainer