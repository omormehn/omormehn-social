import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabIcon from '@/components/TabIcon'
import { bg } from '@/constants/bg'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconPath={bg.homeIcon} iconPath1={bg.homeIcon1} />
          )
        }} />
      <Tabs.Screen name='DiscoverScreen'
        options={{
          title: 'Discover',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconPath={bg.categoryIcon} iconPath1={bg.categoryIcon1} />
          )
        }} />
      <Tabs.Screen name='NotificationScreen'
        options={{
          title: 'Notification',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconPath={bg.notificationIcon1} iconPath1={bg.notificationIcon1} />
          )
        }} />
      <Tabs.Screen name='ProfileScreen'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconPath={bg.profileIcon} iconPath1={bg.profileIcon1} />
          )
        }} />
    </Tabs>
  )
}

export default _layout