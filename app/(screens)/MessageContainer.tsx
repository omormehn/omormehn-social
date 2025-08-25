import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { router } from 'expo-router';
import MessageInput from '@/components/container/MessageInput';
import Feather from 'react-native-vector-icons/Feather';
import MessageCard from '@/components/card/MessageCard';



const MessageContainer = () => {
    return (
        <View style={styles.container}>

            {/* Head */}
            <View style={styles.header}>
                <View style={styles.headerBody} >
                    <View className='flex-row items-center gap-6'>
                        <AntDesign onPress={() => router.back()} name="arrowleft" size={24} color="black" />
                        <TouchableOpacity className='flex-row items-center gap-4'>
                            <View className='size-10 rounded-full bg-gray-300' />
                            <Text className='font-bold text-xl'>Peter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Body */}
            <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 120, gap: 20, }} showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 25 }} >
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>
                <View style={{ alignItems: 'flex-start' }} ><MessageCard message='wassup gee' /></View>
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>
                <View style={{ alignItems: 'flex-start' }} ><MessageCard message='wassup gee' /></View>
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>
                <View style={{ alignItems: 'flex-start' }} ><MessageCard message='wassup gee' /></View>
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>
                <View style={{ alignItems: 'flex-start' }} ><MessageCard message='wassup gee' /></View>
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>
                <View style={{ alignItems: 'flex-start' }} ><MessageCard message='wassup gee' /></View>
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>
                <View style={{ alignItems: 'flex-start' }} ><MessageCard message='wassup gee' /></View>
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>
                <View style={{ alignItems: 'flex-start' }} ><MessageCard message='wassup gee' /></View>
                <View style={{ alignItems: 'flex-end' }} ><MessageCard message='wagwan' /></View>


            </ScrollView>

            {/* Bottom */}
            <View style={styles.inputContainer}>
                <MessageInput />
                <TouchableOpacity onPress={() => { }} className='bg-gray-100 py-4 px-4 rounded-full'>
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
        backgroundColor: 'white'
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
        backgroundColor: 'white',
        padding: 15,

    }
})