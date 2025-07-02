import { Text, View, TextInput as RNTextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAuth } from '@/context/AuthContext'
import { useCommentDrawer } from '@/context/CommentContext'
import CommentSkeleton from './loaders/CommentSkeleton'
import { Comment, Prop } from '@/types/types'
import { bg } from '@/constants/bg'



const CommentDrawer = ({ bottomSheetRef }: Prop) => {

    const { user } = useAuth();
    const { currentPost, fetchComments, comments, addComment, loading } = useCommentDrawer();


    const [comment, setComment] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const snapPoints = ['85%'];

    const textInputRef = useRef<RNTextInput | undefined>(null);

    const handleStateChange = useCallback((index: number) => {
        const isOpen = index >= 0;
        setIsSheetOpen(isOpen);
        if (isOpen) {
            fetchComments(currentPost.id);
            requestAnimationFrame(() => {
                textInputRef.current?.focus();
            });
        } else {
            Keyboard.dismiss();
        }
    }, []);

    const handleSubmit = async () => {
        if (!comment.trim() || !currentPost || !user) return;

        try {
            await addComment(user?.id, user?.username!, comment.trim(), currentPost.id, user?.avatar!);
            setComment("")
            Keyboard.dismiss();
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    }


    const formatTimeAgo = (dateString: string) => {
        const now = new Date();
        const commentDate = new Date(dateString);
        const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
        return `${Math.floor(diffInSeconds / 604800)}w`;
    };

    const renderComment = ({ item }: { item: Comment }) => {
        return (
            <View className='flex-row px-4 gap-2 py-4 items-start'>

                {/* Avatar */}
                {item.avatar ? (
                    <Image source={{ uri: item.avatar }} style={{ width: '10%', aspectRatio: 1 }} className='rounded-full' />
                ) : (
                    <Image source={bg.profile} style={{ width: '100%', aspectRatio: 1 }} className='rounded-full' />
                )}

                <View className='flex-1'>
                    <View className='flex-row gap-2'>
                        <Text>{item.user_name}</Text>
                        <Text className='text-gray-500  text-base'>{formatTimeAgo(item.created_at)}</Text>
                        {currentPost.uploader === item.user_name && (
                            <View className='bg-gray-100 w-16  rounded-md'>
                                <Text className='text-center text-base'>Author</Text>
                            </View>
                        )}

                    </View>
                    <Text>{item.comment}</Text>
                </View>
            </View>
        )
    }

    const renderEmptyState = () => (
        <View className='flex-1 justify-center items-center px-8'>
            <Ionicons name="chatbubble-outline" size={48} color="#D1D5DB" />
            <Text className='text-xl font-medium text-gray-800 mt-4'>No comments yet</Text>
            <Text className='text-base text-gray-500 mt-1 text-center'>
                Start the conversation and be the first to comment
            </Text>
        </View>
    );


    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            index={-1}
            onChange={handleStateChange}
            keyboardBehavior="interactive"
            android_keyboardInputMode="adjustResize"
        >
            <BottomSheetView className='flex-1 h-full'>
                <View className='flex-1'>
                    <View className="items-center">
                        <Text className='font-bold'>Comments</Text>
                    </View>

                    {/*  Comment list */}

                    <View className='flex-1'>
                        {loading ? (
                            <CommentSkeleton />
                        ) : comments.length > 0 ? (
                            <BottomSheetFlatList
                                data={comments}
                                renderItem={renderComment}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                ItemSeparatorComponent={() => <View className='h-px bg-gray-50 mx-4' />}
                                keyboardDismissMode={"on-drag"}
                            />
                        ) : (
                            renderEmptyState()
                        )}
                    </View>


                </View>
                {/* Textbox */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <View className='border-t border-gray-200 bg-white'>
                        <View className='flex-row gap-2 items-center px-4 py-3'>
                            {user?.avatar ? (
                                <Image source={{ uri: user.avatar }} style={{ width: '10%', aspectRatio: 1, }} className='rounded-full' />

                            ) : (
                                <Image source={bg.profile} style={{ width: '25%', aspectRatio: 1, height: 100 }} resizeMode='contain' />
                            )}
                            <View className='flex-1 bg-gray-100 rounded-full px-4 py-2 mr-3'>
                                <BottomSheetTextInput
                                    ref={textInputRef}
                                    placeholder="Enter comment..."
                                    value={comment}
                                    onChangeText={setComment}
                                    placeholderTextColor='#9CA3AF'
                                    className='text-base'
                                    maxLength={2200}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={!comment.trim()}
                                className={`${comment.trim() ? 'opacity-100' : 'opacity-50'}`}
                            >
                                <Ionicons name='send' size={20} onPress={handleSubmit} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </BottomSheetView >
        </BottomSheet >
    )
}

export default CommentDrawer