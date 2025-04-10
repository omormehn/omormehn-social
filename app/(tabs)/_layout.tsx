import React from 'react'
import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/CustomTabBar'
import { icon } from '@/constants/icon'
import { useAuth } from '@/context/AuthContext'
import SplashScreen from '@/components/SplashScreen'


const _layout = () => {

  const { loading } = useAuth();

  if (loading) return <SplashScreen />;


  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          zIndex: 0
        }
      }}


      tabBar={(props: any) => <CustomTabBar
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