import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'


const MessageInput = () => {
    return (
        <View style={styles.input} >
            <TextInput
                placeholder='Enter message...'
                placeholderTextColor={'black'}
                className='w-full px-4'
            />
        </View>
    )
}

export default MessageInput

const styles = StyleSheet.create({
    input: {
        width: '80%',
        borderRadius: 30,
        paddingVertical: 10,
        // backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 2
    }
})