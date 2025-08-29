import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'


const MessageInput = ({ value, onChange }: { value: string, onChange: (text: string) => void }) => {
    return (
        <View style={styles.input} >
            <TextInput
                placeholder='Enter message...'
                placeholderTextColor={'black'}
                className='w-full px-4 text-black'
                value={value}
                onChangeText={onChange}
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
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2
    }
})