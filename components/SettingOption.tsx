import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const SettingOption = ({ title }: { title: string }) => {
  return (
    <View style={styles.option} className=" rounded-r-full px-6 py-4 bg-bgShade">
      <View>
        <Text className='text-white text-xl'>{title}</Text>
      </View>
      <TouchableOpacity className='rounded-full absolute right-2 p-3 bg-bgShade2 '>
        <Icon name='arrow-forward-ios' color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  option: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default SettingOption