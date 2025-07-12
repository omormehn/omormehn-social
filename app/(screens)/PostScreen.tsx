import React = require('react');
import { ActivityIndicator, Dimensions, StyleSheet, View, Image, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
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
    const [comment, setComment] = React.useState("");

    const url = uri.toString();



    const uploadToSupabase = async () => {
        try {
            setLoading(true)
            const base64 = await FileSystem.readAsStringAsync(uri as string, { encoding: 'base64' });
            const filePath = `${user?.id}/${new Date().getTime()}.${type === 'image' ? 'png' : 'mp4'}`;
            const contentType = type === 'image' ? 'image/png' : 'video/mp4';
            const { error } = await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
            if (!error) {
                await supabase.from('media_uploads').insert([
                    {
                        user_id: user?.id,
                        file_name: filePath,
                        comment
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

    if (loading) {
        return (
            <ActivityIndicator className='flex-1 justify-center items-center' size={53} color={'black'} />
        )
    }


    return (
        <View className='flex-1 bg-white'>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', top: 8, right: 10 }}>
                <TouchableOpacity onPress={uploadToSupabase}>
                    <Text className='font-bold'>Post</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='px-4 pt-6 gap-4'>
                <View className='mb-4'>
                    {type === 'image' ? (
                        <Image
                            source={{ uri: url }}
                            resizeMode='cover'
                            style={{ height: 350, width: '100%', borderRadius: 8 }}
                        />
                    ) : (
                        <VideoRender
                            uri={url}
                            isActive
                            height={350}
                            permit={false}
                        />
                    )}
                </View>
                <View className='w-full mb-4 border border-gray-300 rounded-2xl px-4 py-2 '>
                    <TextInput
                        placeholder="Enter comment..."
                        placeholderTextColor="gray"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                </View>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({

})


export default PostScreen;