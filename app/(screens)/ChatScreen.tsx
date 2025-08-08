import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import SearchBar from '@/components/SearchBar';

const ChatScreen = () => {
    const { user } = useAuth();
    const [messages, setMessages] = React.useState([]);

    return (
        <ScrollView style={styles.container}>
            {/* Screen Custom Header */}
            <View style={styles.header}>
                <View className='flex-row items-center gap-4'>
                    <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" />
                    <Text className='font-bold text-xl'>{user?.username}</Text>
                </View>
                <MaterialIcons name="add-comment" size={24} color="black" />
            </View>
            {/* Search */}
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            <View className='justify-center items-center  mt-10'>
                <SearchBar width={350} />
            </View>
            {/* Chat Messages */}
            <View className='flex-1'>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <View key={index} className='p-4 border-b border-gray-200'>
                            {/* <Text className='text-base'>{message.text}</Text> */}
                        </View>
                    ))
                ) : (
                    <View className='flex-1 justify-center items-center'>
                        <Text className='text-gray-500'>No messages yet</Text>
                    </View>
                )}
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure header is on top
    },
})