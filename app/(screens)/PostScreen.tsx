import React = require('react');
import { ActivityIndicator, Dimensions, StyleSheet, View, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams } from 'expo-router/build/hooks';

import PostButton from '@/components/button/PostButton';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/services/supabase';
import { decode } from 'base64-arraybuffer';
import VideoRender from '@/components/VideoRender';




const PostScreen = () => {
    const { user } = useAuth();

    const { uri, type } = useLocalSearchParams();

    const [loading, setLoading] = React.useState(false);

    const url = uri.toString();



    const uploadToSupabase = async () => {
        try {
            setLoading(true)
            const base64 = await FileSystem.readAsStringAsync(uri as string, { encoding: 'base64' });
            const filePath = `${user?.id}/${new Date().getTime()}.${type === 'image' ? 'png' : 'mp4'}`;
            const contentType = type === 'image' ? 'image/png' : 'video/mp4';
            const { data, error } = await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
            if (!error) {
                await supabase.from('media_uploads').insert([
                    {
                        user_id: user?.id,
                        file_name: filePath
                    }
                ]);
                setLoading(false);
            } else {
                console.error('Upload failed:', error);
            }
            router.replace({
                pathname: "/(tabs)",
            });
        } catch (error) {
            console.log('Error in upload', error)
        } finally {
            setLoading(false);
        }
    }


    return (
        <View className='flex-1 gap-16'>
            {loading ? (
                <ActivityIndicator className='flex-1 justify-center items-center' size={53} color={'black'} />
            ) : (
                <View>
                    {type === 'image' ? (
                        <Image className=' w-full' source={{ uri: url }} style={styles.video} />

                    ) : type === 'video' && (
                        <VideoRender uri={url} isActive/>
                        
                    )}
                    <View className='flex-row justify-center gap-8 p-4 '>
                        <PostButton title='x' onclick={() => router.back()} />
                        <PostButton title='check' onclick={uploadToSupabase} loading={loading} />
                    </View>
                </View>
            )}
        </View>
    )
}

export default PostScreen

const styles = StyleSheet.create({
    video: {
        aspectRatio: 1,
        width: Dimensions.get('window').width,
       
        // or use aspectRatio directly:
        // aspectRatio: 16/9,
        // width: '100%',
    }
})