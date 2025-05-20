import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { EmailProps, PasswordProps } from '@/types/types';
import React = require('react');

export default function PasswordContainer(
    { password,
        onchangetext,
        secureTextEntry,
        placeholder,
        onpress,
        iconName
    }: PasswordProps) {
    return (
        <View className="relative justify-between items-start bg-gray-100 px-4 py-4 rounded-full mb-4">
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="gray"
                className="text-lg text-black w-[90%]"
                value={password}
                onChangeText={onchangetext}
                secureTextEntry={secureTextEntry}
            />
            <Icon name={iconName} onPress={onpress} size={17} className='absolute right-5 top-8' />
        </View>
    )
}
export function EmailContainer({ email, onchangetext }: EmailProps) {
    return (
        <View className="justify-center  bg-gray-100 px-4 py-4 rounded-full mb-4">
            <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                className="text-lg"
                value={email}
                onChangeText={onchangetext}
                autoCapitalize='none'
                keyboardType='email-address'
            />
        </View>
    )
}
export function NameContainer({ email, onchangetext, placeHolder }: EmailProps) {
    return (
        <View className="justify-center  bg-gray-100 px-4 py-4 rounded-full mb-4">
            <TextInput
                placeholder={placeHolder}
                placeholderTextColor="gray"
                className="text-lg"
                value={email}
                onChangeText={onchangetext}
                autoCapitalize='none'
            />
        </View>
    )
}