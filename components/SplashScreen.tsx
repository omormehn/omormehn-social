
import { bg } from '@/constants/bg';
import React from 'react';
import { View, Image } from 'react-native';



const SplashScreen = () => {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Image source={bg.splash}  className='w-full h-full' resizeMode='contain' />
    </View>
  );
};


export default SplashScreen;