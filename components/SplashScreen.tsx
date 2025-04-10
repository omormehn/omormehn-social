import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';


import { useNavigation } from 'expo-router';
import PulseSkeleton from './PulseSkeleton';



const SplashScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
  }, [navigation]);

  return (
    <View className="flex-1 bg-white px-4 pt-8">
      {/* Search Bar Skeleton */}
      <View className="flex-row gap-2 mt-4">
        <PulseSkeleton className="h-10 flex-1 rounded-md" />
        <PulseSkeleton className="w-10 h-10 rounded-full" />
      </View>

      {/* Filter Tabs Skeleton */}
      <View className="flex-row justify-center mt-8 gap-4">
        {[1, 2, 3].map((_, i) => (
          <PulseSkeleton key={i} className="bg-gray-200 w-[100px] h-8 rounded-full" />
        ))}
      </View>

      {/* Cards Skeleton */}
      {[1, 2].map((_, i) => (
        <View key={i} className="bg-white mt-10 w-full rounded-xl shadow-sm border border-gray-100">
          {/* Header */}
          <PulseSkeleton className="flex-row items-center justify-between px-4 pt-4 pb-2">
            <View className="flex-row items-center gap-2">
              <View className="bg-gray-200 size-10 rounded-full" />
              <View className="bg-gray-200 h-4 w-24 rounded-md" />
            </View>
            <View className="bg-gray-200 h-3 w-16 rounded-md" />
          </PulseSkeleton>

          {/* Image Placeholder */}
          <PulseSkeleton className="bg-gray-200 h-56 w-full" />

          {/* Footer */}
          <View className="flex-row items-center justify-between px-4 py-4">
            <PulseSkeleton className="bg-gray-200 h-4 w-8 rounded-md" />
            <View className="flex-row gap-4">
              <View className="flex-row items-center gap-2">
                <PulseSkeleton className="bg-gray-200 h-4 w-6 rounded-md" />
                <PulseSkeleton className="bg-gray-200 h-4 w-4 rounded-full" />
              </View>
              <View className="flex-row items-center gap-2">
                <PulseSkeleton className="bg-gray-200 h-4 w-10 rounded-md" />
                <PulseSkeleton className="bg-gray-200 h-4 w-4 rounded-full" />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};



export default SplashScreen;