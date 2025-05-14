import 'react-native-url-polyfill/auto';

import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native'

import Icon from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import SearchBar from '@/components/SearchBar';
import HomeFilter from '@/components/HomeFilter';
import { bg } from '@/constants/bg';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { supabase } from '@/services/supabase';

const HomeScreen = () => {

    const [focus, setFocus] = useState('Popular');

    const { session, loading, user } = useAuth();

    const [media, setMedia] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            loadImages();
        }
    }, [user]);


    const loadImages = async () => {
        const { data, error } = await supabase.storage.from('files').list(user?.id)


        if (error) {
            console.error("Failed to list media:", error);
            return;
        }

        const files = await Promise.all(data.map(async (file) => {
            const { data: signedUrlData } = await supabase
                .storage
                .from('files')
                .createSignedUrl(`${user?.id}/${file.name}`, 60 * 60);

            if (error) {
                console.error("Failed to download file:", error);
                return null;
            }


            return {
                name: file.name,
                url: signedUrlData?.signedUrl,
                type: file.name.endsWith('.mp4') ? 'video' : 'image'
            };
        }));

        setMedia(files)
    }

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity activeOpacity={0.8}
            style={styles.cardShadow}
            className='mt-10   bg-white w-full rounded-lg'>

            {/* Part 1 */}
            <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                <TouchableOpacity className='flex-row gap-2 items-center'>
                    <Image className='size-10' source={bg.profile} />
                    <Text>Useni Nathan</Text>
                </TouchableOpacity>
                <Text>1 hour ago</Text>
            </View>

            {/* Part 2 */}
            <View className='w-full'>
                <Image
                    source={{ uri: item.url }}
                    style={{ aspectRatio: 1, width: '100%' }}
                    className="rounded-lg"
                />
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

            <FlatList
                data={media}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />

            {/* Body
            <ScrollView contentContainerStyle={{
                alignItems: 'center',
                paddingHorizontal: 25,
                paddingBottom: 100
            }}>

            </ScrollView> */}
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
    }
})

export default HomeScreen
