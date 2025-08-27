import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Chat = () => {
    return (
        <TouchableOpacity onPress={() => router.push('/(screens)/MessageContainer')} style={styles.container}>
            <View className='flex-row gap-4'>
                <View className='size-14 rounded-full bg-gray-300' />

                <View className='flex-col gap-'>
                    <Text className='font-bold text-xl'>Peter</Text>
                    <Text>Hello Peter</Text>
                </View>
            </View>

            <View className='items-end text-end'>
                <Text>2:20pm</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },
})