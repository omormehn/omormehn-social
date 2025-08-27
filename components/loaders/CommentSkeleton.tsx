import { View, Text } from 'react-native'
import React from 'react'
import PulseSkeleton from './PulseSkeleton'

const CommentSkeleton = () => {
    return (
        <View className='gap-4 pt-6'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
                <View key={i} className='flex-row px-4 gap-2 py-4 items-start'>
                    {/* Avatar */}
                    < PulseSkeleton className='size-10 bg-gray-200 rounded-full' />

                    <View className='flex-1 gap-2'>
                        <View className='flex-row flex-1 gap-2'>
                            <PulseSkeleton className='bg-gray-200 h-4 w-24 rounded-md' />
                            <PulseSkeleton className='bg-gray-200 h-4 w-16 rounded-md' />
                        </View>
                        <View className='bg-gray-200 h-4 w-full rounded-md' />
                    </View>
                </View>
            ))}
        </View>
    )
}

export default CommentSkeleton