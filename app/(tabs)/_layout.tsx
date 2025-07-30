import React, { useMemo, useRef } from 'react'
import { Text } from 'react-native'
import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/CustomTabBar'
import { icon } from '@/constants/icon'

const _layout = () => {

  const iconPath = useMemo(() => ({
    index: { active: icon.homeIcon, inactive: icon.homeIcon1 },
    DiscoverScreen: { active: icon.categoryIcon, inactive: icon.categoryIcon1 },
    NotificationScreen: { active: icon.notificationIcon1, inactive: icon.notificationIcon1 },
    ProfileScreen: { active: icon.profileIcon, inactive: icon.profileIcon1 },
  }), []);
  return (
    <Tabs

      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          zIndex: 0
        },
        lazy: true
      }}
      tabBar={(props: any) => <CustomTabBar
        iconPaths={iconPath}
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