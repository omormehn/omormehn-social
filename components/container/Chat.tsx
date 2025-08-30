import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { formatMessageTime } from '@/utils/formatTime'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/services/supabase'

interface ChatProp {
    id: string
    msgId: string
    receiverName: string
    lastMessage: string
    time: string
    avatar: string
    users: []
}

const Chat = ({ id, receiverName, lastMessage, time, avatar, users, msgId }: ChatProp) => {
    const { user } = useAuth();
    const [message, setMessage] = useState<any>([])
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
    useEffect(() => {
        async function test() {
            const message = await supabase.from('message').select('*').eq('id', msgId)
            setMessage(message.data?.[0])
        }
        test()
    }, [])
   
    return (
        <TouchableOpacity onPress={routeToChat} style={styles.container}>
            <View className='flex-row gap-4'>
                <Image source={{ uri: avatar }} className='size-14 rounded-full bg-gray-300' />

                <View className='flex-col gap-'>
                    <Text className='font-bold text-xl'>{receiverName}</Text>
                    <View className='flex-row items-center gap-2'>
                        {message?.senderId === user?.id && (
                            <IonIcons size={16} name='checkmark-outline' />
                        )}
                        <Text>{lastMessage}</Text>
                    </View>
                </View>
            </View>

            <View className='items-end text-end'>
                <Text>{formatMessageTime(time)}</Text>
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