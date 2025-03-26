import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { HomeFilterProps } from '@/types/types'

const HomeFilter = ({ title, focus = false, onpress }: HomeFilterProps) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onpress}>
            <View className={`py-4 w-[120px] items-center rounded-xl  ${focus ? 'bg-primaryBg' : 'bg-white'}`}>
                <Text className={`${focus ? 'text-textColor font-bold' : 'font-normal text-[#BDBDBD]'}  text-lg`}>{title}</Text>
            </View >
        </TouchableOpacity>
    )
}

export default HomeFilter