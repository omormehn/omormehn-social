import HomeFilter from '@/components/HomeFilter';
import SearchBar from '@/components/SearchBar';
import SplashScreen from '@/components/SplashScreen';
import { bg } from '@/constants/bg';
import { useAuth } from '@/context/AuthContext';
import { Redirect, router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
    const { user, loading, logout } = useAuth();

    const [focus, setFocus] = useState("Popular");

    if (loading) {
        return <SplashScreen />
    }

    return (
        <View className='flex-1'>
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
                            w={120}
                        />
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
                <View
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 4, 
                    }}
                    className='mt-10   bg-white w-full rounded-lg'>
                    {/* Part 1 */}
                    <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                        <View className='flex-row gap-2 items-center'>
                            <Image className='size-10' source={bg.profile} />
                            <Text>Useni Nathan</Text>
                        </View>
                        <Text>1 hour ago</Text>
                    </View>
                    {/* Part 2 */}
                    <View className='w-full'>
                        <Image source={bg.homeContent1} />
                    </View>
                    {/* Part 3 */}
                    <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                        <View className='flex-row gap-2 items-center'>
                            <Image className='size-8' source={bg.profile} />
                            <Text>Useni Nathan</Text>
                        </View>
                        <Text>1 hour ago</Text>
                    </View>
                </View>
                {/* Card 2 */}
                <View
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                    className='mt-10   bg-white w-full rounded-lg'>
                    {/* Part 1 */}
                    <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                        <View className='flex-row gap-2 items-center'>
                            <Image className='size-10' source={bg.profile} />
                            <Text>John Doe</Text>
                        </View>
                        <Text>1 hour ago</Text>
                    </View>
                    {/* Part 2 */}
                    <View className='w-full'>
                        <Image source={bg.homeContent2} />
                    </View>
                    {/* Part 3 */}
                    <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                        <View className='flex-row gap-2 items-center'>
                            <Image className='size-8' source={bg.profile} />
                            <Text>Useni Nathan</Text>
                        </View>
                        <Text>1 hour ago</Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}


export default HomeScreen;
