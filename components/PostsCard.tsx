import { bg } from "@/constants/bg";
import dayjs from "dayjs";
import React, { memo, useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icon3 from 'react-native-vector-icons/AntDesign';
import MediaPlaceholder from "./MediaPlaceholder";
import VideoRender from "./VideoRender";



const PostsCard = ({ item, visibleVideo, isLoading }: { item: any, visibleVideo: string | null, isLoading?: boolean }) => {
    const [hasError, setHasError] = useState(false);


    return (
        <TouchableOpacity activeOpacity={0.8}
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
                        <Text>Couldn't load media</Text>
                    </View>
                ) : (
                    <View className='w-full'>
                        {
                            item.type === 'video' ? (
                                <VideoRender uri={item.url} isActive={visibleVideo === item.url} />
                            ) : item.type === 'image' && (
                                <View>
                                    <Image
                                        source={{ uri: item.url }}
                                        style={{ aspectRatio: 1, width: '100%' }}
                                        className="rounded-lg"
                                        // onLoadStart={() => setIsLoading(true)}
                                        // onLoadEnd={() => setIsLoading(false)}
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
                        <Text>20</Text>
                        <Icon3 name='message1' size={15} color={'#5151C6'} />
                    </TouchableOpacity>


                    {/* Likes */}
                    <TouchableOpacity style={styles.card}>
                        <Text>250</Text>
                        <Icon name='heart' size={15} color={'#5151C6'} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
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
    placeholderContainer: {}
});
