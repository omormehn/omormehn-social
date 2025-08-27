import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView, Platform, SafeAreaView, ActivityIndicator, FlatList, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { bg } from '@/constants/bg'
import { icon } from '@/constants/icon'
import Icon from 'react-native-vector-icons/Feather';
import HomeFilter from '@/components/card/HomeFilter';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/services/supabase';
import dayjs from 'dayjs';
import { useLikes } from '@/context/LikeContext';
import Entypo from "react-native-vector-icons/Entypo"


const Profile = ({ posts, user, allowFollow = true, followUser, isFollowing }: { posts: any[], user: any, allowFollow?: boolean, followUser?: () => void, isFollowing?: boolean }) => {
    const { user: data } = useAuth();
    const { fetchLikes } = useLikes()!;

    const [focus, setFocus] = useState("Shots");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isAvatarVisible, setIsAvatarVisible] = useState(false);
    const [count, setCount] = useState(0)
    const [toggleDropDown, setToggle] = useState(false)

    // useEffect(() => {
    //     const id = posts.map((p) => p.id)
    //     async () => {
    //         const data = await fetchLikes(id)
    //     }

    // })


    const toggleDrop = () => {
        setToggle(!toggleDropDown)
    }

    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity activeOpacity={0.8}
                style={styles.cardShadow}
                className='mt-10  bg-white w-full rounded-lg'>

                {/* Part 1 */}
                <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                    <Text>{dayjs(item.created_at).fromNow()}</Text>
                </View>
                {/* Part 2 */}
                <View className='w-full'>
                    <View className='w-full '>
                        <View>
                            <Image
                                source={{ uri: item.url }}
                                style={{ aspectRatio: 1, width: '100%' }}
                                className="rounded-lg"
                            />
                        </View>
                    </View>
                </View>

                {/* Part 3 */}
                <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-4'>
                    <View className='flex-row gap-4 items-center'>
                        {/* Likes */}
                        <TouchableOpacity style={styles.card}>
                            <Text>{count}</Text>
                            <Icon name='heart' size={15} color={'#5151C6'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    const handleFilterChange = (title: string) => {
        if (title === focus) return;
        setFocus(title);
        console.log('title', title);

        if (title === 'Shots') {
            // setPosts(posts.filter(post => post.type === 'image'));
        }
    }

    const renderProfileHeader = () => (
        <View className='w-full gap-4'>

            {/* Top Image */}
            <View className='w-full'>
                {/* Img */}
                <View style={{ width: 420 }}>
                    <Image className='w-full h-[150px]' resizeMode='cover' source={bg.categoryImg} />
                </View>
                {/* Username */}
                <Text className='absolute left-1/2 -translate-x-1/2 top-12 text-white font-bold text-xl '>@{user?.username}</Text>
                {/* Setting Icon */}
                {data?.id === user.id && (
                    <TouchableOpacity onPress={() => router.push('/(screens)/Settings')} className='absolute right-5 top-12'>
                        <Image source={icon.settingsIcon} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Profile Image */}
            <TouchableOpacity onPress={() => setIsAvatarVisible(true)} className='justify-center items-center'>
                <View style={styles.profilePic}>
                    {user?.avatar === '' ? (
                        <Image style={{ width: 84, height: 80, }} source={bg.profile} resizeMode='cover' />
                    ) : (
                        <Image style={{ width: '100%', aspectRatio: 1, }} className='rounded-full' source={{ uri: user?.avatar }} />
                    )}
                </View>
            </TouchableOpacity>

            <View className='items-center px-4 gap-4'>
                {/* Name and location */}
                <View className='pt-6'>
                    {/* Name */}
                    <Text className='text-xl text-center font-bold'>{user?.username}</Text>
                    <Text className='text-lg text-center text-shade'>P.W, Maroko</Text>
                </View>

                {/* Followers */}
                <View className='bg-grayBg py-4 px-2 w-full flex-row justify-center gap-8 rounded-md'>
                    <Text className='font-bold'>
                        200 {" "}<Text className='text-placeHolder'>Followers</Text>
                    </Text>

                    <Text className='font-bold'>
                        150  {" "}<Text className='text-placeHolder'>Following</Text>
                    </Text>
                </View>
                {allowFollow && (
                    <View className='flex-row gap-4 py-2'>
                        <TouchableOpacity className='px-6 py-2 bg-gray-200 rounded-xl'>

                            {isFollowing
                                ? (
                                    <View style={{ position: 'relative' }}>
                                        <TouchableOpacity className='flex-row gap-2' >
                                            <Text className='text-base font-semibold'>Following</Text>
                                            <Entypo name='chevron-down' size={23} onPress={toggleDrop} />
                                        </TouchableOpacity>

                                        <Modal visible={toggleDropDown} transparent animationType="fade">
                                            <TouchableWithoutFeedback onPress={() => setToggle(false)}>
                                                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                                    <View style={{
                                                        position: 'absolute',
                                                        top: 415,
                                                        left: 150,
                                                        backgroundColor: 'white',
                                                        paddingVertical: 20,
                                                        paddingHorizontal: 20,
                                                        borderRadius: 8,
                                                        gap: 10
                                                    }}>
                                                        <Text onPress={followUser}>Unfollow</Text>
                                                        <Text>Block</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </Modal>

                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={() => {
                                        followUser!();
                                        setToggle(false)
                                    }} >
                                        <Text className='text-base font-semibold'> Follow</Text>
                                    </TouchableOpacity>
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity className='px-4 py-2 bg-gray-200 rounded-xl z-0'>
                            <Text>Message</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Socials */}
                {data?.id === user.id && (
                    <View className='flex-row gap-8 py-2 items-center'>
                        <Icon size={20} color={'#8F90A7'} name='facebook' />
                        <View style={styles.seperator} />
                        <Icon size={20} color={'#8F90A7'} name='instagram' />
                        <View style={styles.seperator} />
                        <Icon size={20} color={'#8F90A7'} name='globe' />
                    </View>
                )}

                {/* Filter */}
                <View className='flex-row'>
                    {["Shots", "Collections"].map((title) => (
                        <HomeFilter
                            key={title}
                            title={title}
                            focus={focus === title}
                            onpress={() => handleFilterChange(title)}
                            w={180}
                        />
                    ))}
                </View>

            </View>
        </View>
    )


    return (
        <View className='flex-1 bg-white' >
            <Modal
                visible={isAvatarVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsAvatarVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsAvatarVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.centeredContainer}>
                            <Image
                                source={{ uri: user?.avatar }}
                                style={styles.popupAvatar}
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Body */}
            <View className='flex-1 items-center gap-4'>
                {/* Extra */}
                <View>

                    {/* Body */}
                    {loading ? (
                        <ActivityIndicator className='h-[60%] justify-center items-center' size={50} />
                    ) : error ? (
                        <View className='h-[60%] justify-center items-center'>
                            <Text className='text-center'>Failed to load posts. Please check your network and try again.</Text>
                            {/* <Button title={'Try again'} onPress={fetchUsersPost} /> */}
                        </View>
                    ) : (
                        <FlatList
                            data={posts}
                            renderItem={renderItem}
                            ListHeaderComponent={renderProfileHeader}
                             keyExtractor={(item, index) => index.toString()}

                        />
                    )}
                </View>
            </View>
        </View >

    )
}

const styles = StyleSheet.create({
    profilePic: {
        position: 'absolute',
        borderRadius: 60,
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperator: {
        width: 7,
        height: 7,
        backgroundColor: '#888BF4',
        borderRadius: 20
    },
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
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupAvatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },

})

export default memo(Profile)