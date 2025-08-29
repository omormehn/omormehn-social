import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

interface ChatProp {
    id: string
    receiverName: string
    lastMessage: string
    time: string
    avatar: string
}

const Chat = ({ id, receiverName, lastMessage, time, avatar }: ChatProp) => {
    const routeToChat = () => {
        if (!id) {
            console.log('no id')
            return;
        }
        router.push({
            pathname: `/(screens)/Chats/[id]`,
            params: {receiverName, avatar, id}
        })
    }
    return (
        <TouchableOpacity onPress={routeToChat} style={styles.container}>
            <View className='flex-row gap-4'>
                <Image source={{ uri: avatar }} className='size-14 rounded-full bg-gray-300' />

                <View className='flex-col gap-'>
                    <Text className='font-bold text-xl'>{receiverName}</Text>
                    <Text>{lastMessage}</Text>
                </View>
            </View>

            <View className='items-end text-end'>
                <Text>{time}</Text>
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
        marginBottom: 35,

    },
})