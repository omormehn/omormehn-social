import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import MessageInput from '@/components/container/MessageInput';
import Feather from 'react-native-vector-icons/Feather';
import MessageCard from '@/components/card/MessageCard';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';
import { useChats } from '@/hooks/useChats';
import { useSocket } from '@/context/SocketContext';
import useSocketEvents from '@/hooks/useSocketEvents';

const MessageContainer = () => {
    const { user } = useAuth()
    const { receiverName, avatar, id } = useLocalSearchParams();
    const { messages } = useChats(user?.id, id)
    const { socket } = useSocket();


    const [message, setMessage] = useState("");
    const [realTimeMessages, setRealTimeMessages] = useState<any[]>(messages.data ?? [])
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        setRealTimeMessages(messages.data ?? [])
    }, [messages.data])

    // Drop received message
    useEffect(() => {
        socket?.on('receiveMessage', (data) => {
        })

        return () => {
            socket?.off('receiveMessage')
        }
    }, [message, socket])


    useEffect(() => {
        if (realTimeMessages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
            }, 100);
        }
    }, [realTimeMessages]);

    const handleSend = async () => {
        const msg = message.trim()
        if (msg.length == 0) return;


        const tempMessage = {
            id: Date.now(),
            text: msg,
            senderId: user?.id,
            chat_id: id,
            created_at: Date.now()
        }
        setRealTimeMessages((prev) => {
            return [...prev, tempMessage]
        })
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
        try {
            const { data, error } = await supabase.from('message').insert([{
                chat_id: id,
                text: msg,
                senderId: user?.id
            }]).select().single()
            if (error) {
                console.log('err', error)
            }

            const { data: chatData, error: err } = await supabase.from('chat').update({ last_message: msg, message: data?.id }).eq('id', id).select().single()

            if (err) {
                console.log('failed to update message', err)
            }
            const receiverId = chatData.users.filter((ch: any) => ch !== user?.id)[0]


            socket?.emit('sendMessage', {
                receiverId,
                userId: user?.id,
                data
            });

            setMessage("")

        } catch (error) {
            console.log('error: ', error)
        }

    };

    // Todo: be at the bottom when focused
    const reversedMessages = [...realTimeMessages].reverse();


    const renderItem = ({ item }: { item: any }) => {
        return <View style={{ marginBottom: 15, paddingHorizontal: 20 }} ><MessageCard message={item.text} time={item.created_at} type={item.senderId === user?.id} /></View>

    }
    return (
        <View style={styles.container}>

            {/* Head */}
            <View style={styles.header}>
                <View style={styles.headerBody} >
                    <View className='flex-row items-center gap-6'>
                        <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" />
                        <TouchableOpacity className='flex-row items-center gap-4'>
                            <Image source={{ uri: avatar.toString() }} width={40} height={40} className='size-12 rounded-full bg-gray-300' />
                            <Text className='font-bold text-xl'>{receiverName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Body */}
            <FlatList
                data={reversedMessages}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ paddingTop: 120, paddingBottom: 40 }}
                inverted
                showsVerticalScrollIndicator={true}
                onContentSizeChange={() => {
                    if (realTimeMessages.length > 0) {
                        flatListRef.current?.scrollToEnd({ animated: false });
                    }
                }}

            />


            {/* Bottom */}
            <View style={styles.inputContainer}>
                <MessageInput value={message} onChange={setMessage} />
                <TouchableOpacity onPress={handleSend} className='bg-gray-100 py-4 px-4 rounded-full'>
                    <Feather name='send' size={23} />
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default MessageContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 100,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,

    },
    headerBody: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        padding: 15,

    }
})