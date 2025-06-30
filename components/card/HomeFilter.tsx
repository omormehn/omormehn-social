import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { HomeFilterProps } from '@/types/types'

const HomeFilter = ({ title, focus = false, onpress, w }: HomeFilterProps) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onpress}>
            <View style={{width:w}} className={`py-4 w-full items-center rounded-xl  ${focus ? 'bg-primaryBg' : 'bg-white'}`}>
                <Text className={`${focus ? 'text-textColor font-bold' : 'font-normal text-[#BDBDBD]'}  text-lg`}>{title}</Text>
            </View >
        </TouchableOpacity>
    )
}

export default HomeFilter