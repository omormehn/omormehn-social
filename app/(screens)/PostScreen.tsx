import { View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Image } from 'expo-image';
import PostButton from '@/components/PostButton';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/services/supabase';
import { decode } from 'base64-arraybuffer';


const PostScreen = () => {
    const { user } = useAuth();

    const { uri, type } = useLocalSearchParams();



    const uploadToSupabase = async () => {
        const base64 = await FileSystem.readAsStringAsync(uri as string, { encoding: 'base64' });
        const filePath = `${user?.id}/${new Date().getTime()}.${type === 'image' ? 'png' : 'mp4'}`;
        const contentType = type === 'image' ? 'image/png' : 'video/mp4';
        const { data, error } = await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });

        if (error) {
            console.log("Error uploading file: ", error);
            return;
        }
        console.log("File uploaded successfully: ", data);
        router.push("/(tabs)");
    }
    return (
        <View className='flex-1 gap-16'>
            {uri &&
                <Image className=' w-full' source={{ uri }} style={{ aspectRatio: 1 }} />
            }

            <View className='flex-row justify-center gap-8 p-4 '>
                <PostButton title='x' onclick={() => router.replace("/(tabs)")} />
                <PostButton title='check' onclick={uploadToSupabase} />
            </View>

        </View>
    )
}

export default PostScreen