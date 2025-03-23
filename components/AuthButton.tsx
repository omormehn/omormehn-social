import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const AuthButton = ({ title, onpress, loading }: AuthButtonProps) => {
    return (
        <TouchableOpacity onPress={onpress} activeOpacity={0.8}>
            <LinearGradient
                colors={['#5151C6', '#888BF4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 14, borderRadius: 25 }}
            >
                {loading ? (
                    <ActivityIndicator size={20} color={'black'} />
                ) : (
                    <Text style={{ letterSpacing: 1 }} className='text-center font-bold text-white text-lg'>
                        {title}
                    </Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default AuthButton