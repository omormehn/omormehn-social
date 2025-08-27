import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import Chat from '@/components/container/Chat';

const ChatScreen = () => {
    const { user } = useAuth();
    const [messages, setMessages] = React.useState([]);

    return (
        <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
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
                    <Chat />
                </View>
            </View>
        </ScrollView>

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