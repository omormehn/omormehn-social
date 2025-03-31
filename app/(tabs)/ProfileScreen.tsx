import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { bg } from '@/constants/bg'
import { icon } from '@/constants/icon'
import Icon from 'react-native-vector-icons/Feather';
import HomeFilter from '@/components/HomeFilter';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const ProfileScreen = () => {
  const { user } = useAuth();

  const [focus, setFocus] = useState("shots");

  const [collectionCount, setCollectionCount] = useState(0);
  const [shotCount, setShotCount] = useState(0);


  return (
    <View className='flex-1 bg-white'>
      {/* Top Image */}
      <View>
        {/* Img */}
        <Image className='w-full' source={bg.categoryImg} />
        {/* Username */}
        <Text className='absolute left-1/2 -translate-x-1/2 top-12 text-white font-medium '>@{user?.displayName}</Text>
        {/* Setting Icon */}
        <TouchableOpacity onPress={() => router.push('/(screens)/[Settings]')} className='absolute right-5 top-12'>
          <Image source={icon.settingsIcon} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View className='flex-1 items-center gap-10 px-4'>
        {/* Profile Image */}
        <View className='justify-center items-center'>
          <View style={styles.profilePic}>
            <Image style={{ width: 84, height: 80, }} source={bg.profile} resizeMode='cover' />
          </View>
        </View>

        {/* Name and location */}
        <View className='pt-6'>
          {/* Name */}
          <Text className='text-xl  font-bold'>Useni Nathan</Text>
          <Text className='text-lg text-center text-shade'>P.W, Maroko</Text>
        </View>

        {/* Followers */}
        <View className='bg-grayBg py-4 w-full flex-row justify-center gap-8 rounded-md'>
          <Text className='font-bold'>
            200 {" "}<Text className='text-placeHolder'>Followers</Text>
          </Text>
          <Text className='font-bold'>
            150  {" "}<Text className='text-placeHolder'>Following</Text>
          </Text>
        </View>

        {/* Socials */}
        <View className='flex-row gap-8  items-center'>
          <Icon size={20} color={'#8F90A7'} name='facebook' />
          <View style={styles.seperator} />
          <Icon size={20} color={'#8F90A7'} name='instagram' />
          <View style={styles.seperator} />
          <Icon size={20} color={'#8F90A7'} name='globe' />
        </View>

        {/* Extra */}
        <View>
          {/* Filter */}
          <View className='flex-row'>
            {[shotCount + " Shots", collectionCount + " Collections"].map((title) => (
              <HomeFilter
                key={title}
                title={title}
                focus={focus === title}
                onpress={() => setFocus(title)}
                w={180}
              />
            ))}
          </View>
          {/* Body */}
          <ScrollView>
            <View className='items-center pt-8'>
              <Image source={bg.profileExtraImg} />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profilePic: {
    position: 'absolute',
    borderRadius: 60,
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  seperator: {
    width: 7,
    height: 7,
    backgroundColor: '#888BF4',
    borderRadius: 20
  }
})

export default ProfileScreen