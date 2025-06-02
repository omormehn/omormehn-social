import { bg } from "@/constants/bg";
import dayjs from "dayjs";
import React, { memo, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icon3 from 'react-native-vector-icons/AntDesign';
import MediaPlaceholder from "./MediaPlaceholder";
import VideoRender from "./VideoRender";

import Video, { VideoRef } from 'react-native-video';
import { supabase } from "@/services/supabase";
import { useAuth } from "@/context/AuthContext";



const PostsCard = ({ item, visibleVideo, isLoading, postId, comments }: { item: any, visibleVideo?: string | null, isLoading?: boolean, postId: number, comments?: number }) => {
    const [hasError, setHasError] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLike, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0)

    const { user } = useAuth();
    const videoRef = useRef<VideoRef>(null);

    const muteAudio = () => {
        if (isMuted) {
            setIsMuted(false);
        }
        setIsMuted(true);
    }

    useEffect(() => {
        const fetchLikeData = async () => {
            if (!user) return;

            const { count, error: countError } = await supabase
                .from('likes')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', postId)
            if (countError) throw countError;
            const { data: likesData, error: likesError } = await supabase.from('likes').select('*').eq('post_id', postId).eq('user_id', user.id).maybeSingle();
            setLike(!!likesData);
            setLikeCount(count!)
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
                const { error } = await supabase.from('likes').delete().eq('user_id', user?.id).eq('post_id', postId);
                if (error) {
                    console.log('error delete', error)
                }
            } else {
                const { error } = await supabase.from('likes').insert([
                    {
                        user_id: user?.id,
                        post_id: postId
                    }
                ]);
                if (error) {
                    console.log('error insert', error)
                }
            }
        } catch (error) {
            console.log('error in handle like', error)
            setLike(likeStates.isLike);
            setLikeCount(likeStates.likeCount);
        }
    }
    // console.log(user?.id)

    return (
        <View
            style={styles.cardShadow}
            className='mt-10  bg-white w-full rounded-lg'>

            {/* Part 1 */}
            <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                <TouchableOpacity className='flex-row gap-2 items-center'>
                    <Image className='size-10' source={bg.profile} />
                    <Text>{item.uploader}</Text>
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
                    <View className='w-full '>
                        {
                            item.type === 'video' ? (
                                // <Video source={{ uri: item.url }} resizeMode="cover" onPointerDown={muteAudio} muted={isMuted ? !isMuted : isMuted} ref={videoRef} style={{ aspectRatio: 1 }} />

                                <VideoRender uri={item.url} isActive={visibleVideo === item.url} />
                            ) : item.type === 'image' && (
                                <View>
                                    <Image
                                        source={{ uri: item.url }}
                                        style={{ aspectRatio: 1, width: '100%' }}
                                        className="rounded-lg"
                                        onError={() => {
                                            setHasError(true);
                                            isLoading = false;
                                        }}
                                    />
                                </View>
                            )
                        }
                    </View>
                )}
            </View>

            {/* Part 3 */}
            <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-4'>

                <TouchableOpacity>
                    <Icon3 name='pluscircleo' size={17} color={'#5151C6'} />
                </TouchableOpacity>

                <View className='flex-row gap-4 items-center'>

                    {/* Comment */}
                    <TouchableOpacity style={styles.card}>
                        <Text>{comments ? comments : 0}</Text>
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
        </View>
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
