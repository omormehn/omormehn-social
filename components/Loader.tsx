import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import PulseSkeleton from './PulseSkeleton'

const Loader = () => {
    return (
        <ScrollView >
            {
                [1, 2, 3].map((_, i) => (
                    <View key={i} className="bg-white mt-10 w-full rounded-xl shadow-sm border border-gray-100">
                        {/* Header */}
                        <PulseSkeleton className="flex-row items-center justify-between px-4 pt-4 pb-2">
                            <View className="flex-row items-center gap-2">
                                <View className="bg-gray-200 size-10 rounded-full" />
                                <View className="bg-gray-200 h-4 w-24 rounded-md" />
                            </View>
                            <View className="bg-gray-200 h-3 w-16 rounded-md" />
                        </PulseSkeleton>

                        {/* Image Placeholder */}
                        <PulseSkeleton className="bg-gray-200 h-56 w-full" />

                        {/* Footer */}
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <PulseSkeleton className="bg-gray-200 h-4 w-8 rounded-md" />
                            <View className="flex-row gap-4">
                                <View className="flex-row items-center gap-2">
                                    <PulseSkeleton className="bg-gray-200 h-4 w-6 rounded-md" />
                                    <PulseSkeleton className="bg-gray-200 h-4 w-4 rounded-full" />
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <PulseSkeleton className="bg-gray-200 h-4 w-10 rounded-md" />
                                    <PulseSkeleton className="bg-gray-200 h-4 w-4 rounded-full" />
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    )
}

export default Loader