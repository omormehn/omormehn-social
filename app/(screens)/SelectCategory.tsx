import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bg } from '@/constants/bg';
import AuthButton from '@/components/AuthButton';

const SelectCategory = () => {

  const router = useRouter();

  const handleCategorySelect = async () => {
    await AsyncStorage.setItem("hasSelectedCategory", "true");
    router.replace("/");
  };

  return (
    <View className='flex-1'>
      <View>
        <Image className='w-full' source={bg.categoryImg} />
        <Text className='absolute top-10 left-1/2  -translate-x-1/2 text-gray-400 font-bold text-2xl'>Omormehn</Text>
      </View>

      <View style={{ paddingHorizontal: 25, marginTop: 30, alignItems: 'center', }}>
        <Text className='text-center font-bold text-lg'>Who are you?</Text>

        <View style={{ paddingTop: 40, flexDirection: 'row', gap: 20, flexWrap: 'wrap' }}>
          <View className='items-center'>
            <Image source={bg.category1} />
            <Text style={styles.text}>Photographer</Text>
          </View>
          <View className='items-center'>
            <Image source={bg.category2} />
            <Text style={styles.text}>Video Creator</Text>
          </View>
          <View className='items-center'>
            <Image source={bg.category3} />
            <Text style={styles.text}>Illustrator</Text>
          </View>
          <View className='items-center'>
            <Image source={bg.category4} />
            <Text style={styles.text}>Designer</Text>
          </View>
        </View>
        <View className='flex-row pt-8'>
          <Text className='text-textColor text-lg uppercase'>Share{" "}- </Text>
          <Text className='text-textColor text-lg uppercase'>Inspire{" "}- </Text>
          <Text className='text-textColor text-lg uppercase'>Connect{" "}</Text>
        </View>

        <View className='w-full pt-8'>
          <AuthButton title='EXPLORE NOW' onpress={handleCategorySelect} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    color: 'white',
    fontWeight: 800,
    bottom: 20
  }
})


export default SelectCategory