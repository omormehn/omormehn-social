
import { bg } from '@/constants/bg';
import React from 'react';
import { View, Image } from 'react-native';



const SplashScreen = () => {
  return (
    <View style={{zIndex:50}} className='flex-1 w-full justify-center items-center bg-white'>
      <Image source={bg.splash}  className='w-full h-full' resizeMode='contain' />
    </View>
  );
};


export default SplashScreen;