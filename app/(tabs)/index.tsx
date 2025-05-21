import 'react-native-url-polyfill/auto';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, FlatList, Button, ActivityIndicator, ViewToken } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import SearchBar from '@/components/SearchBar';
import HomeFilter from '@/components/HomeFilter';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/services/supabase';
import Loader from '@/components/Loader';
import dayjs = require('dayjs');
import relativeTime from 'dayjs/plugin/relativeTime';
import PostsCard from '@/components/PostsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {

    const [focus, setFocus] = useState('Popular');

    const { user } = useAuth();
    // console.log(user)

    const [media, setMedia] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [visibleVideo, setVisibleVideo] = useState<string | null>(null);


    dayjs.extend(relativeTime);

    useEffect(() => {
        if (user) {
            loadImages();
        }
    }, [user]);

    const loadImages = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('media_uploads')
                .select('*, profiles(username) ')
                .order('created_at', { ascending: false });
            // console.log('data', data)
            if (error) {
                console.error("Failed to list media:", error);
                setError(error.message)
                return;
            }

            const files = await Promise.all(data.map(async (file) => {
                
                const { data: signedUrlData } = await supabase
                    .storage
                    .from('files')
                    .createSignedUrl(file.file_name, 60 * 60);

                if (error) {
                    console.error("Failed to download file:", error);
                    return null;
                }
                
                return {
                    name: file.file_name,
                    uploader: file.profiles.username,
                    url: signedUrlData?.signedUrl,
                    type: file.file_name.endsWith('.mp4') ? 'video' : 'image',
                    created_at: file.created_at
                };
            }));

            setMedia(files)

        } catch (error) {
            console.error("Error loading images:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const onViewRef = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0].item;
            if (firstVisibleItem.type === 'video') {
                setVisibleVideo(firstVisibleItem.url);
            } else {
                setVisibleVideo(null);
            }
        } else {
            setVisibleVideo(null);
        }
    }, []);


    const viewConfigRef = useRef({
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 300
    });



    return (
        <View className='flex-1'>
            <StatusBar style="dark" translucent={false} />
            <View className='bg-white pb-4'>
                {/* Top 1 */}
                <View className='flex-row px-4 pt-8 gap-2'>
                    <SearchBar />
                    <TouchableOpacity className='bg-gray-100 py-4 px-4 rounded-full'>
                        <Icon name='send' size={20} />
                    </TouchableOpacity>
                </View>

                {/* Top 2 */}
                <View className='flex-row justify-center pt-8 '>
                    {["Popular", "Following", "Trending"].map((title) => (
                        <HomeFilter
                            key={title}
                            title={title}
                            focus={focus === title}
                            onpress={() => setFocus(title)}
                            w={120} />
                    ))}
                </View>
            </View>

            <View className='flex-1 justify-center items-center'>
                {error && !isLoading && (
                    <View className='py-4 gap-4'>
                        <Text>{error}</Text>
                        <Button onPress={loadImages} title='Retry' color={'#888BF4'} />
                    </View>
                )}
            </View>

            {media.length === 0 && !isLoading && error === null && (
                <Text className='text-center'>No media Available</Text>
            )}

            {isLoading ? <Loader /> : (
                <FlatList
                    data={media}
                    keyExtractor={(item) => item.name}
                    renderItem={({item}) => <PostsCard item={item} visibleVideo={visibleVideo!}/>}
                    contentContainerStyle={{ padding: 16 }}
                    style={{ marginBottom: 100 }}
                    refreshing={isLoading}
                    onRefresh={loadImages}
                    onViewableItemsChanged={onViewRef}
                    viewabilityConfig={viewConfigRef.current}
                    windowSize={5}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    updateCellsBatchingPeriod={100}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
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
    placeholder: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    }
})

export default HomeScreen
