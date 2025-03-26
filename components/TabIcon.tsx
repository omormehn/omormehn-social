import { View, Text, Image } from 'react-native'
import React from 'react'
import { TabBarProps } from '@/types/types'
import Icon from 'react-native-vector-icons/Octicons';
const TabIcon = ({ focused, iconPath, iconPath1 }: TabBarProps) => {
    return (
        focused ? (
            <View
                style={{
                    flexDirection: "row",
                    gap: 6, minWidth: 80, top: 3, height: 50, borderRadius: 30,
                    overflow: 'hidden', justifyContent: "center", alignItems: "center"
                }}
            >
                <Image source={iconPath} width={20} height={20} />
            </View>
        ) : (
            <View
                style={{ top: 3 }}
            >
                <Image source={iconPath1} width={20} height={20} />
            </View>
        )
    )
}

export default TabIcon