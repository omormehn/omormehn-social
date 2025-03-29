import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/CustomTabBar'
import { Icon } from 'react-native-vector-icons/Icon'
import { Image } from 'react-native'
import DiscoverScreen from './DiscoverScreen'
import { icon } from '@/constants/icon'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}

      tabBar={(props) => <CustomTabBar
        iconPaths={{
          index: { active: icon.homeIcon, inactive: icon.homeIcon1 },
          DiscoverScreen: { active: icon.categoryIcon, inactive: icon.categoryIcon1 },
          NotificationScreen: { active: icon.notificationIcon1, inactive: icon.notificationIcon1 },
          ProfileScreen: { active: icon.profileIcon, inactive: icon.profileIcon1 }
        }}
        {...props} />}
    >
      <Tabs.Screen name='index'
        options={{
          title: 'Home',
          headerShown: false,
        }} />
      <Tabs.Screen name='DiscoverScreen'
        options={{
          title: 'Discover',
          headerShown: false,
        }} />
      <Tabs.Screen name='NotificationScreen'
        options={{
          title: 'Notification',
          headerShown: false,
        }} />
      <Tabs.Screen name='ProfileScreen'
        options={{
          title: 'Profile',
          headerShown: false,
        }} />
    </Tabs>
  )
}

export default _layout