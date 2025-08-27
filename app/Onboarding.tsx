import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { bg } from '@/constants/bg';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstScreen = () => {
  const router = useRouter();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding","true");
    router.replace('/Register');
  }

  return (
    <ImageBackground
      source={bg.homeBg}
      className='flex-1 h-full w-full'
    >
      <Text className='text-3xl font-bold pt-16 text-white text-center'>Omor Connect</Text>

      <View className='flex-1 justify-center items-center gap-10'>
        <View className='items-center gap-8'>
          <Image className='' source={bg.homeBg2} />

          <View className='flex-row'>
            <Text className='text-white text-lg font-light uppercase'>Share{" "}- </Text>
            <Text className='text-white text-lg font-light uppercase'>Inspire{" "}- </Text>
            <Text className='text-white text-lg font-light uppercase'>Connect{" "}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={completeOnboarding} 
          className='bg-[#4F4F4Fc0] px-8 py-4 rounded-full'
        >
          <Text className='text-white font-semibold'>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default FirstScreen;