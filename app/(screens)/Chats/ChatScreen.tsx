import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import Chat from '@/components/container/Chat';
import { useChats } from '@/hooks/useChats';
import useSocketEvents from '@/hooks/useSocketEvents';
import { useSocket } from '@/context/SocketContext';
import { supabase } from '@/services/supabase';
import { useQueryClient } from '@tanstack/react-query';

const ChatScreen = () => {
    const queryClient = useQueryClient()
    const { user } = useAuth();
    const { socket } = useSocket()
    const { chats } = useChats(user?.id!)

    useSocketEvents(socket, {
        updateLastMessage: async (data: any) => {
            console.log('dt', data)
            queryClient.setQueryData(['chats', user?.id], (oldData: any) => {
                if (!oldData) return oldData

                return oldData.map((ch: any) => {
                    if (ch.chat.id === data.chat_id) {
                        console.log('ch', ch)
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
                    return ch
                })
              
            })
        }
    })

    const renderItem = ({ item }: { item: any }) => {
        return <Chat id={item.chat.id} receiverName={item.chat.receiver.username} users={item.chat.users} msgId={item.chat.message} lastMessage={item.chat.last_message} time={item.chat.created_at} avatar={item.chat.receiver.avatar_url} />
    }


    return (
        <View style={styles.container}>
            {/* Screen Custom Header */}
            <View style={styles.header}>
                <View className='mt-10 flex-row justify-between items-center'>
                    <View className='flex-row  gap-4'>
                        <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" />
                        <Text className='font-bold text-xl'>{user?.username}</Text>
                    </View>
                    <MaterialIcons name="add-comment" size={24} color="black" />
                </View>
            </View>

            <View className='mt-28'>
                <View className='flex-row items-center justify-between px-5'>
                    <Text className='font-bold text-lg'>Messages</Text>
                    <Text className='text-primary font-semibold'>Requests</Text>
                </View>
                <View className='mt-10'>
                    <FlatList
                        data={chats?.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>

    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 30,
        zIndex: 1,

    },
})