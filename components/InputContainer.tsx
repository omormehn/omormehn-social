import { View, Text } from 'react-native'
import React from 'react'

export default function PasswordContainer({ children }: { children: React.ReactNode }) {
    return (
        <View className="relative justify-between items-start bg-gray-100 px-4 py-2 rounded-full mb-4">
            {children}
        </View>
    )
}