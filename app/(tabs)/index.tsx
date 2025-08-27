import 'react-native-url-polyfill/auto';
import React, { memo, use, useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View, Text, FlatList, Button, ActivityIndicator, ViewToken } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import SearchBar from '@/components/SearchBar';
import HomeFilter from '@/components/card/HomeFilter';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/services/supabase';
import Loader from '@/components/loaders/Loader';
import dayjs = require('dayjs');
import relativeTime from 'dayjs/plugin/relativeTime';
import PostsCard from '@/components/card/PostsCard';
import { getCachedMedia, setCachedMedia } from '@/utils/cached';
import { router, useFocusEffect } from 'expo-router';
import useSocketEvents from '@/hooks/useSocketEvents';
import { io } from 'socket.io-client';





const HomeScreen = () => {
    const PAGE_SIZE = 10;

    const [focus, setFocus] = useState('Popular');
    const { user } = useAuth();
    const { socket } = useSocketEvents()




    // States
    const [media, setMedia] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [visibleVideo, setVisibleVideo] = useState<string | null>(null);
    const [isImageLoading, setImageLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);


    const isFetching = useRef(false);


    dayjs.extend(relativeTime);

    // First load


    useFocusEffect(
        useCallback(() => {

            if (user) {
                loadInitData();
            }
            return () => {
                setVisibleVideo(null);
            }
        }, [user])
    )

    const loadInitData = async () => {
        if (isFetching.current) return;
        isFetching.current = true;

        try {
            setIsLoading(true);

            const cached = await getCachedMedia();
            if (cached) setMedia(cached);

            const freshData = await loadMedia(1);

            if (freshData) {
                if (!cached || JSON.stringify(freshData) !== JSON.stringify(cached)) {
                    setMedia(freshData);
                    await setCachedMedia(freshData);
                }
            }
        } catch (error) {
            console.log('error initializing data')
        } finally {
            setIsLoading(false);
            isFetching.current = false
        }

    }

    const loadMedia = async (pageNum: number) => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('media_uploads')
                .select('*, profiles(*)')
                .order('created_at', { ascending: false })
                .range((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE - 1);

            if (error) {
                console.error("Failed to list media:", error);
                setError(error.message)
                return;
            }
            setImageLoading(true);
            const files = await Promise.all(
                data.map(async (file) => {
                    const { data: signedUrlData } = await supabase
                        .storage
                        .from('files')
                        .createSignedUrl(file.file_name, 60 * 60);
                    return {
                        id: file.id,
                        name: file.file_name,
                        comment: file?.comment,
                        uploader: {
                            id: file.profiles.id,
                            username: file.profiles.username,
                            avatar: file.profiles.avatar_url,
                        },
                        url: signedUrlData?.signedUrl,
                        type: file.file_name.endsWith('.mp4') ? 'video' : 'image',
                        created_at: file.created_at
                    };
                }));

            setImageLoading(false);

            return files.filter(Boolean);

        } catch (error) {
            console.error("Error loading images:", error);
        } finally {
            setImageLoading(false);
        }
    }

    const handleRefresh = async () => {
        if (isFetching.current) return;
        isFetching.current = true

        try {
            setIsRefreshing(true);
            const files = await loadMedia(1);
            if (files?.length! > 0) {
                setMedia(files!);
                await setCachedMedia(files);
                setPage(page);
            }

        } catch (error) {
            console.log("error in handle refresh", error);
        } finally {
            setIsRefreshing(false);
            isFetching.current = false;
        }

    }

    const loadMore = async () => {
        if (!user) return;
        if (!hasMore || isFetching.current) return;
        isFetching.current = true;
        setIsLoadingMore(true);

        try {
            const files = await loadMedia(page);

            if (files?.length! > 0) {
                setMedia(prev => {
                    const newItems = files?.filter(newItem => !prev.some(item => item.name === newItem.name))
                    return [...prev, ...newItems!]
                });

                setPage(page => page + 1);
                setHasMore(files?.length === PAGE_SIZE);
            } else {
                setHasMore(false)
            }
        } catch (error) {
            console.log('error in load more', error)
        } finally {
            isFetching.current = false;
            setIsLoadingMore(false);
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



    const renderItem = useCallback(({ item }: { item: any }) => {
        return <PostsCard item={item} visibleVideo={visibleVideo!} isLoading={isImageLoading} postId={item.id} />
    }, [visibleVideo]);



    return (
        <View className='flex-1'>
            <StatusBar style="dark" />
            <View className='bg-white pb-4'>
                {/* Top 1 */}
                <View className='flex-row px-6 pt-16 gap-2'>
                    <SearchBar />
                    <TouchableOpacity onPress={() => router.push("/(screens)/ChatScreen")} className='bg-gray-100 py-4 px-4 rounded-full'>
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
                        <Button onPress={loadInitData} title='Retry' color={'#888BF4'} />
                    </View>
                )}
            </View>



            {isLoading ? (
                <Loader />
            ) : media.length === 0 ? (
                <View className='flex-1'>
                    <Text className='text-center'>No media Available</Text>
                </View>
            ) : (
                <FlatList
                    data={media}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{}}
                    style={{ marginBottom: 100, }}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.2}
                    onViewableItemsChanged={onViewRef}
                    viewabilityConfig={viewConfigRef.current}
                    windowSize={5}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={100}
                    ListEmptyComponent={
                        isLoading ? <Loader /> : null
                    }
                    ListFooterComponent={
                        isLoadingMore ? <ActivityIndicator size="small" className='py-8' color="#888BF4" /> : null
                    }
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                    }}
                />
            )}
        </View>
    )
}

export default memo(HomeScreen)
