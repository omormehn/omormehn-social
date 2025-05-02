
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import Icon from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import SearchBar from '@/components/SearchBar';
import HomeFilter from '@/components/HomeFilter';
import { bg } from '@/constants/bg';
import { useAuth } from '@/context/AuthContext';
import SplashScreen from '@/components/SplashScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {

    const [focus, setFocus] = useState('Popular');
    const { loading } = useAuth();

    // if (loading) return <SplashScreen />


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

            {/* Body */}
            <ScrollView contentContainerStyle={{
                alignItems: 'center',
                paddingHorizontal: 25,
                paddingBottom: 100
            }}>
                {/* Card 1 */}
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
                        <Image source={bg.homeContent1} />
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

                {/* Card 2 */}
                <TouchableOpacity activeOpacity={0.8}
                    style={styles.cardShadow}
                    className='mt-10   bg-white w-full rounded-lg'>

                    {/* Part 1 */}
                    <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                        <TouchableOpacity className='flex-row gap-2 items-center'>
                            <Image className='size-10' source={bg.profile} />
                            <Text>John Doe</Text>
                        </TouchableOpacity>
                        <Text>10 hour ago</Text>
                    </View>

                    {/* Part 2 */}
                    <View className='w-full'>
                        <Image source={bg.homeContent2} />
                    </View>

                    {/* Part 3 */}
                    <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-4'>

                        <TouchableOpacity>
                            <Icon3 name='pluscircleo' size={17} color={'#5151C6'} />
                        </TouchableOpacity>

                        <View className='flex-row gap-4 items-center'>

                            {/* Comment */}
                            <TouchableOpacity style={styles.card}>
                                <Text>70</Text>
                                <Icon3 name='message1' size={15} color={'#5151C6'} />
                            </TouchableOpacity>


                            {/* Likes */}
                            <TouchableOpacity style={styles.card}>
                                <Text>2500</Text>
                                <Icon name='heart' size={15} color={'#5151C6'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
