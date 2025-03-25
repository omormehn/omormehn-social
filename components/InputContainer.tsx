import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { EmailProps, PasswordProps } from '@/types/types';

export default function PasswordContainer(
    { password, 
      onchangetext, 
      secureTextEntry, 
      placeholder, 
      onpress, 
      iconName 
    }: PasswordProps) {
    return (
        <View className="relative justify-between items-start bg-gray-100 px-4 py-2 rounded-full mb-4">
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="gray"
                className="text-lg w-[90%]"
                value={password}
                onChangeText={onchangetext}
                secureTextEntry={secureTextEntry}
            />
            <Icon name={iconName} onPress={onpress} size={17} className='text-end absolute right-5 top-6 ' />
        </View>
    )
}
export function EmailContainer({ email, onchangetext }: EmailProps) {
    return (
        <View className="justify-center  bg-gray-100 px-4 py-2 rounded-full mb-4">
            <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                className="text-lg"
                value={email}
                onChangeText={onchangetext}
            />
        </View>
    )
}