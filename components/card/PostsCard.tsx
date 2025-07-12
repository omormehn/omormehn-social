import { bg } from "@/constants/bg";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icon3 from 'react-native-vector-icons/AntDesign';
import MediaPlaceholder from "../loaders/MediaPlaceholder";
import VideoRender from "../VideoRender";
import { supabase } from "@/services/supabase";
import { useAuth } from "@/context/AuthContext";
import { useCommentDrawer } from "@/context/CommentContext";
import { router } from "expo-router";
import { useLikes } from "@/context/LikeContext";



const PostsCard = ({ item, visibleVideo, isLoading, postId }: { item: any, visibleVideo?: string | null, isLoading?: boolean, postId: number, comments?: number }) => {
    const [hasError, setHasError] = useState(false);
    const [isLike, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0)
    const [count, setCount] = useState(0);
    const [isRouting, setIsRouting] = useState(false);

    const { user } = useAuth();

    const { fetchLikes, addLike, deleteLike } = useLikes();



    const { openDrawer, countComments, commentCount } = useCommentDrawer();


    useEffect(() => {
        const initialCount = commentCount[item.id] || 0;
        setCount(initialCount);
    }, [item.id, commentCount])

    const refreshCount = useCallback(async () => {
        try {
            const count = await countComments(item.id);
            setCount(count);
        } catch (error) {
            console.error('Error counting comments:', error);
            setHasError(true);
        }
    }, [item.id, countComments])

    useEffect(() => {
        refreshCount();
    }, [item.id]);
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!user) return;

            const data = await fetchLikes(postId);
            setLike(!!data.likesData);
            setLikeCount(data.count!)
        }
        fetchLikeData();
    }, [postId, user])

    const handleLike = async () => {
        if (!user) return;
        const likeStates = { isLike, likeCount }
        setLike(!isLike);
        setLikeCount(prev => isLike ? prev! - 1 : prev! + 1);

        try {
            if (isLike) {
                await deleteLike(postId);
            } else {
                await addLike(postId);

            }
        } catch (error) {
            console.log('error in handle like', error)
            setLike(likeStates.isLike);
            setLikeCount(likeStates.likeCount);
        }
    }

    const routeToProfile = (uploader: { id: string;[key: string]: any }) => {
        if (isRouting) return;
        setIsRouting(true)
        if (user?.id === uploader.id) {
            router.push("/ProfileScreen")
        } else {
            router.push({
                pathname: "/ProfileView",
                params: {
                    uploader: JSON.stringify(uploader)
                }
            })
        }

    }


    return (
        <>
            <View
                className='mt-4 w-full '>
                {/* Part 1 */}
                <View style={{ gap: 35 }} className='flex-row justify-between items-center px-2 py-2'>
                    <TouchableOpacity onPress={() => routeToProfile(item.uploader)} disabled={isRouting} className='flex-row gap-2 items-center'>
                        {item.url ? (
                            <Image className='size-10 rounded-full' source={{ uri: item.uploader.avatar }} />
                        ) : (
                            <Image className='size-10' source={bg.profile} />
                        )}
                        <Text>{item.uploader.username}</Text>
                    </TouchableOpacity>
                    <Text>{dayjs(item.created_at).fromNow()}</Text>
                </View>

                {/* Part 2 */}
                <View className='w-full'>
                    {isLoading && !hasError ? (
                        <MediaPlaceholder />
                    ) : hasError ? (
                        <View style={styles.placeholderContainer}>
                            <Text className="text-center">Couldn't load media</Text>
                        </View>
                    ) : (
                        <View className='w-full'>
                            {item.type === 'video' ? (
                                <View className="relative">
                                    <VideoRender uri={item.url} isActive={visibleVideo === item.url} />
                                </View>
                            ) : item.type === 'image' && (
                                <View className="relative">
                                    <Image
                                        source={{ uri: item.url }}
                                        style={{ height: 480, width: '100%' }}
                                        className="rounded-lg w-full"
                                        onError={() => {
                                            setHasError(true);
                                            isLoading = false;
                                        }}
                                        resizeMode="cover"
                                    />
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Part 3 */}
                <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-3'>

                    <TouchableOpacity>
                        <Icon3 name='pluscircleo' size={17} color={'#5151C6'} />
                    </TouchableOpacity>

                    <View className='flex-row gap-4 items-center'>
                        {/* Comment */}
                        <TouchableOpacity style={styles.card} onPress={() => openDrawer(item.id, item.uploader.username)}>
                            <Text>{count}</Text>
                            <Icon3 name='message1' size={15} color={'#5151C6'} />
                        </TouchableOpacity>


                        {/* Likes */}
                        <TouchableOpacity onPress={handleLike} style={styles.card}>
                            <Text>{likeCount}</Text>

                            {isLike ? (
                                <Text>❤️</Text>
                            ) : (
                                <Icon name='heart' size={16} color={'#5151C6'} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="px-6 pb-8">
                    <Text className="font-bold">{item.comment && item.uploader.username} <Text className="font-normal"> {item.comment}</Text></Text>
                </View>
            </View>
        </>
    );
}

export default memo(PostsCard);

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
    placeholderContainer: {
        aspectRatio: 1,
        textAlign: 'center'
    }
});
