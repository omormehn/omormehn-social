import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import MessageInput from '@/components/container/MessageInput';
import Feather from 'react-native-vector-icons/Feather';
import MessageCard from '@/components/card/MessageCard';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';
import { useChats } from '@/hooks/useChats';



const MessageContainer = () => {
    const { user } = useAuth()
    const { receiverName, avatar, id } = useLocalSearchParams();
    const { messages } = useChats(user?.id, id)


    const [message, setMessage] = useState("");



    const handleSend = async () => {
        console.log("Message to send:", message);
        const msg = message.trim()
        if (msg.length == 0) return;
        try {
            const { data, error } = await supabase.from('message').insert([{
                chat_id: id,
                text: msg,
                senderId: user?.id
            }])

            //TODO: Update last message

            // const {data: update, error: err} = await supabase.from('chat').update()
            console.log('dt', data)
            setMessage("");

            if (error) {
                console.log('err', error)

            }
        } catch (error) {
            console.log('error: ', error)
        }

    };

    // Todo: be at the bottom when focused

    const renderItem = ({ item }: { item: any }) => {
        return <View style={{ marginBottom: 15, paddingHorizontal: 20 }} ><MessageCard message={item.text} type={item.senderId === user?.id} /></View>

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
                data={messages.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingTop: 40, paddingBottom: 120 }}
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