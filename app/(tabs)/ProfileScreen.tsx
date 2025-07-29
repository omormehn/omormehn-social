import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView, Platform, SafeAreaView, ActivityIndicator, FlatList, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { bg } from '@/constants/bg'
import { icon } from '@/constants/icon'
import Icon from 'react-native-vector-icons/Feather';
import HomeFilter from '@/components/card/HomeFilter';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/services/supabase';
import PostsCard from '@/components/card/PostsCard';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';
import Profile from '@/components/Profile';


const ProfileScreen = () => {
  const { user: data } = useAuth();

  const user = {
    id: data?.id,
    username: data?.username,
    avatar: data?.avatar
  }

  const [focus, setFocus] = useState("Shots");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);


  useEffect(() => {
    fetchUsersPost();
  }, []);



  const fetchUsersPost = async () => {
    if (!user) return;
    setLoading(true)
    try {
      const { data, error } = await supabase.from('media_uploads').select('*').eq('user_id', user?.id);
      if (error) {
        console.error('Error fetching user posts:', error);
        setError(true);
        return;
      }


      const posts = await Promise.all(
        data.map(async (post) => {
          const { data: signedUrl } = await supabase.storage.from('files').createSignedUrl(post.file_name, 60 * 60);
          return {
            id: post.id,
            url: signedUrl?.signedUrl,
            created_at: post.created_at
          }
        })
      );

      setPosts(posts);
    } catch (error) {
      console.log('error in fetch', error)
    } finally {
      setLoading(false);
    }
  }



  return (
    <View className='flex-1 bg-white' >
      <Profile posts={posts} user={user} allowFollow={false} />
    </View>

  )
}

const styles = StyleSheet.create({
  profilePic: {
    position: 'absolute',
    borderRadius: 60,
    width: 80,
    height: 80,
    borderWidth: 2,
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

})

export default ProfileScreen