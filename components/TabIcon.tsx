import { View, Text, Image } from 'react-native'
import React from 'react'
import { TabBarProps } from '@/types/types'
import Icon from 'react-native-vector-icons/Octicons';
const TabIcon = ({ focused, iconPath, iconPath1 }: TabBarProps) => {
    return (
        <Image source={focused ? iconPath : iconPath1} style={{ width: 20, height: 20 }} />
    )
}

export default TabIcon