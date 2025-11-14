import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/services/supabase';
import Profile from '@/components/Profile';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const ProfileView = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const { uploader: data } = useLocalSearchParams();
    const uploader = JSON.parse(data as string)



    const [posts, setPosts] = useState<any[]>([]);
    const [isAvatarVisible, setIsAvatarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false)

    const checkFollowing = async () => {
        const { data, error: fetchError } = await supabase
            .from("profiles")
            .select("following")
            .eq("id", user?.id)
            .single()
        const existingFollowing = data?.following || []
        existingFollowing.includes(uploader?.username) && setIsFollowing(true)
        return { existingFollowing, fetchError };
    }

    useEffect(() => {
        checkFollowing();
        return () => { }
    }, [uploader, user])



    const followUser = async () => {
        if (!user || !uploader) return;
        const { existingFollowing, fetchError } = await checkFollowing()

        if (fetchError) {
            console.log("error fetching following")
        }
        setIsFollowing(true)

        if (existingFollowing.includes(uploader.username)) {
            setIsFollowing(false);
            const updatedFollowing = existingFollowing.filter((item: any) => item !== uploader.username)
            await supabase.from("profiles").update([
                {
                    following: updatedFollowing
                }
            ]).eq("id", user.id).single()
            return;
        }
        const updatedFollowing = [...existingFollowing, uploader.username]

        const { data, error } = await supabase.from("profiles").update([
            {
                following: updatedFollowing
            }
        ]).eq("id", user.id).single()
    }

    useLayoutEffect(() => {
        if (uploader.username) {
            navigation.setOptions({
                title: uploader.username
            })
        }
    }, [navigation, uploader.username])

    useEffect(() => {
        fetchUsersPost();
    }, [])

    const fetchUsersPost = async () => {
        if (!uploader) return;
        setLoading(true)
        try {
            const { data, error } = await supabase.from('media_uploads').select('*').eq('user_id', uploader.id);
            if (error) {
                console.error('Error fetching user posts:', error);
                setError(true);
                return;
            }
            // console.log('User posts:', data);
            // if (data) {
            //     setShotCount(data.filter(item => item.type === 'image').length);
            //     setCollectionCount(data.filter(item => item.type === 'video').length);
            // }


            const posts = await Promise.all(
                data.map(async (post: any) => {
                    const { data: signedUrl } = await supabase.storage.from('files').createSignedUrl(post.file_name, 60 * 60);
                    return {
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
        <View className='flex-1'>
            <Profile posts={posts} user={uploader} followUser={followUser} isFollowing={isFollowing} />
        </View>
    )
}

export default ProfileView