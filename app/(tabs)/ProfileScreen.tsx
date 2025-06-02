import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView, Platform, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bg } from '@/constants/bg'
import { icon } from '@/constants/icon'
import Icon from 'react-native-vector-icons/Feather';
import HomeFilter from '@/components/HomeFilter';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/services/supabase';
import PostsCard from '@/components/PostsCard';
import dayjs from 'dayjs';


const ProfileScreen = () => {
  const { user } = useAuth();

  const [focus, setFocus] = useState("Shots");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [collectionCount, setCollectionCount] = useState(Number);
  const [shotCount, setShotCount] = useState(Number);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchUsersPost();
  }, [])

  const fetchUsersPost = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('media_uploads').select('*').eq('user_id', user?.id);
      if (error) {
        console.error('Error fetching user posts:', error);
        setError(true);
        return;
      }
      // console.log('User posts:', data);
      if (data) {
        setShotCount(data.filter(item => item.type === 'image').length);
        setCollectionCount(data.filter(item => item.type === 'video').length);
      }


      const posts = await Promise.all(
        data.map(async (post) => {
          const { data: signedUrl } = await supabase.storage.from('files').createSignedUrl(post.file_name, 60 * 60);
          return {
            url: signedUrl?.signedUrl,
            created_at: post.created_at
          }
        })
      );
      // console.log('postd', posts)
      setPosts(posts);
    } catch (error) {
      console.log('error in fetch', error)
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity activeOpacity={0.8}
        style={styles.cardShadow}
        className='mt-10  bg-white w-full rounded-lg'>

        {/* Part 1 */}
        <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
          <Text>{dayjs(item.created_at).fromNow()}</Text>
        </View>
        {/* Part 2 */}
        <View className='w-full'>
          <View className='w-full '>
            <View>
              <Image
                source={{ uri: item.url }}
                style={{ aspectRatio: 1, width: '100%' }}
                className="rounded-lg"
              />
            </View>
          </View>
        </View>

        {/* Part 3 */}
        <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-4'>
          <View className='flex-row gap-4 items-center'>
            {/* Likes */}
            <TouchableOpacity style={styles.card}>
              <Text>250</Text>
              <Icon name='heart' size={15} color={'#5151C6'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  const handleFilterChange = (title: string) => {
    if (title === focus) return;
    setFocus(title);
    console.log('title', title);

    if (title === 'Shots') {
      setPosts(posts.filter(post => post.type === 'image'));
    }
  }


  return (
    <View className='flex-1 bg-white'>
      {/* Top Image */}
      <View>
        {/* Img */}
        <Image className='w-full' source={bg.categoryImg} />
        {/* Username */}
        <Text className='absolute left-1/2 -translate-x-1/2 top-12 text-white font-medium '>{user?.username}</Text>
        {/* Setting Icon */}
        <TouchableOpacity onPress={() => router.push('/(screens)/Settings')} className='absolute right-5 top-12'>
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
          <Text className='text-xl text-center font-bold'>{user?.username}</Text>
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
            {["Shots", "Collections"].map((title) => (
              <HomeFilter
                key={title}
                title={title}
                focus={focus === title}
                onpress={() => handleFilterChange(title)}
                w={180}
              />
            ))}
          </View>
          {/* Body */}
          {loading ? (
            <ActivityIndicator className='h-[60%] justify-center items-center' size={50} />
          ) : error ? (
            <View className='h-[60%] justify-center items-center'>
              <Text className='text-center'>Failed to load posts. Please check your network and try again.</Text>
              <Button title={'Try again'} onPress={fetchUsersPost} />
            </View>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderItem}
            />
          )}
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
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
})

export default ProfileScreen