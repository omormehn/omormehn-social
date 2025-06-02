import React = require('react');
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams } from 'expo-router/build/hooks';

import PostButton from '@/components/PostButton';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/services/supabase';
import { decode } from 'base64-arraybuffer';
import { Image } from 'expo-image'
import VideoRender from '@/components/VideoRender';
import Video, { VideoRef } from 'react-native-video';



const PostScreen = () => {
    const { user } = useAuth();

    const { uri, type } = useLocalSearchParams();

    const [loading, setLoading] = React.useState(false);

    const url = uri.toString();



    const uploadToSupabase = async () => {
        let status = 0;
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
                status = 1;
            } else {
                console.error('Upload failed:', error);
            }
            console.log("File uploaded successfully: ", data);
            router.replace({
                pathname: "/(tabs)",
                params: {
                    status
                }
            });
        } catch (error) {
            console.log('Error in upload', error)
        } finally {
            setLoading(false);
        }
    }

    const videoRef = React.useRef<VideoRef>(null);

    return (
        <View className='flex-1 gap-16'>
            {loading ? (
                <ActivityIndicator className='flex-1 justify-center items-center' size={53} color={'black'} />
            ) : (
                <View>
                    {type === 'image' ? (
                        <Image className=' w-full' source={{ uri: uri }} style={styles.video} />

                    ) : type === 'video' && (
                        <Video source={{ uri: url }} ref={videoRef} style={{ aspectRatio: 1 }} />
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