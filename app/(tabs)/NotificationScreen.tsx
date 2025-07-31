import { View, Text } from 'react-native'
import React, { memo } from 'react'

const NotificationScreen = () => {
  return (
    <View className='flex-1 bg-white'>
      <Text>NotificationScreen</Text>
    </View>
  )
}

export default memo(NotificationScreen)