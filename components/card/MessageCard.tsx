import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface MessageCardProps {
    type?: string
    message: string
}

const MessageCard = ({ type, message }: MessageCardProps) => {
    return (
        <View >
            <View style={styles.container}>
                <Text>{message}</Text>
            </View>
            <View style={styles.smaller}></View>
        </View>
    )
}

export default MessageCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#888BF4',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 16
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