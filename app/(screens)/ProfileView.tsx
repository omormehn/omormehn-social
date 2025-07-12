import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/services/supabase';
import Profile from '@/components/Profile';
import { useLocalSearchParams } from 'expo-router';

const ProfileView = () => {

    const { uploader: data } = useLocalSearchParams();
    const uploader = JSON.parse(data as string)



    const [posts, setPosts] = useState<any[]>([]);
    const [isAvatarVisible, setIsAvatarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


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
            // console.log('postd', posts)
            setPosts(posts);
        } catch (error) {
            console.log('error in fetch', error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <View className='flex-1'>
            <Profile posts={posts} user={uploader}/>
        </View>
    )
}

export default ProfileView