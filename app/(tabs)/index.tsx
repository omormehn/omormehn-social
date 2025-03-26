import HomeFilter from '@/components/HomeFilter';
import SearchBar from '@/components/SearchBar';
import SplashScreen from '@/components/SplashScreen';
import { useAuth } from '@/context/AuthContext';
import { Redirect, router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
    const { user, loading, logout } = useAuth();

    const [focus, setFocus] = useState("Popular");

    if (loading) {
        return <SplashScreen />
    }

    return (
        <View className='flex-1  bg-white'>
            {/* Top 1 */}
            <View className='flex-row px-4 pt-8 gap-2'>
                <SearchBar />
                <TouchableOpacity  className='bg-gray-100 py-4 px-4 rounded-full'>
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
                    />
                ))}
            </View>

        </View>
    );
}


export default HomeScreen;
