import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { bg } from '@/constants/bg'
import Icon from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { HomeCardProps } from '@/types/types';


const HomeCard = ({ username, profileImg, createdAt, postImage, commentNo, likesNo }: HomeCardProps) => {
    return (
        <TouchableOpacity activeOpacity={0.8}
            style={styles.cardShadow}
            className='mt-10 bg-white w-full rounded-lg'>

            {/* Part 1 */}
            <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-2'>
                <TouchableOpacity className='flex-row gap-2 items-center'>
                    <Image className='size-10' source={profileImg ? profileImg : bg.profile} />
                    <Text>{username}</Text>
                </TouchableOpacity>
                <Text>{createdAt}</Text>
            </View>

            {/* Part 2 */}
            <View className='w-full'>
                <Image source={postImage} />
            </View>

            {/* Part 3 */}
            <View style={{ gap: 35 }} className='flex-row justify-between items-center px-4 py-4'>

                <TouchableOpacity >
                    <Icon3 name='pluscircleo' size={17} color={'#5151C6'} />
                </TouchableOpacity>

                <View className='flex-row gap-4 items-center'>

                    {/* Comment */}
                    <TouchableOpacity style={styles.card}>
                        <Text>{likesNo}</Text>
                        <Icon3 name='message1' size={15} color={'#5151C6'} />
                    </TouchableOpacity>


                    {/* Likes */}
                    <TouchableOpacity style={styles.card}>
                        <Text>{commentNo}</Text>
                        <Icon name='heart' size={15} color={'#5151C6'} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
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

export default HomeCard