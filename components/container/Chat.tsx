import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { formatMessageTime } from '@/utils/formatTime'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/services/supabase'
import useSocketEvents from '@/hooks/useSocketEvents'
import { useSocket } from '@/context/SocketContext'
import { useChats } from '@/hooks/useChats'
import { useQueryClient } from '@tanstack/react-query'

interface ChatProp {
    id: string
    receiverName: string
    avatar: string
}

const Chat = ({ id, receiverName, avatar }: ChatProp) => {
    const { user } = useAuth();
    const queryClient = useQueryClient()    
    const { socket } = useSocket()
    const { chats } = useChats(user?.id!)

    const chat = chats.data?.find((ch) => ch.chat.id === id)?.chat


    const routeToChat = () => {
        if (!id) {
            console.log('no id')
            return;
        }
        router.push({
            pathname: `/(screens)/Chats/[id]`,
            params: { receiverName, avatar, id }
        })
    }
    useSocketEvents(socket, {
        updateLastMessage: async (data: any) => {
            console.log('update last message', data)
            queryClient.setQueryData(['chats', user?.id], (oldData: any) => {
                if (!oldData) return oldData

                return oldData.map((ch: any) => {
                    if (ch.chat.id === data.chat_id) {
                        return {
                            ...ch,
                            chat: {
                                ...ch.chat,
                                lastMessage: data.text,
                                lastMessageTime: data.created_at,
                                lastMessageSender: data.senderId,
                            },
                        }
                    }
                    console.log('chat', ch)
                    return ch
                })

            })
        }
    })


    return (
        <TouchableOpacity onPress={routeToChat} style={styles.container}>
            <View className='flex-row gap-4'>
                <Image source={{ uri: avatar }} className='size-14 rounded-full bg-gray-300' />

                <View className='flex-col gap-'>
                    <Text className='font-bold text-xl'>{chat?.receiver?.username}</Text>
                    <View className='flex-row items-center gap-2'>
                        {chat?.lastMessageSender === user?.id && (
                            <IonIcons size={16} name='checkmark-outline' />
                        )}
                        <Text>{chat?.lastMessage}</Text>
                    </View>
                </View>
            </View>

            <View className='items-end text-end'>
                <Text>{formatMessageTime(chat?.lastMessageTime)}</Text>
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