import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface MessageCardProps {
    type?: boolean
    message: string
    time?: any
}

const MessageCard = ({ type, message, time }: MessageCardProps) => {
    return (
        <View style={type ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }}>
            <View style={[styles.container, type ? { borderBottomLeftRadius: 16 } : { borderBottomRightRadius: 16 }]}>
                <Text className='text-lg'>{message}</Text>
                <Text className=''>{time}</Text>
            </View>
            <View style={styles.smaller}></View>
        </View>
    )
}

export default MessageCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#888BF4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        minWidth: 50,
        maxWidth: '80%'

    },
    smaller: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        width: 0,
        height: 0,
        borderTopWidth: 15,
        borderBottomWidth: 0,

    }

})