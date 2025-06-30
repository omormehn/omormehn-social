import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { bg } from '@/constants/bg'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { LinearGradient } from 'expo-linear-gradient'
import { NameContainer } from '@/components/container/InputContainer'
import { useAuth } from '@/context/AuthContext'
import AuthButton from '@/components/button/AuthButton'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/services/supabase'

const EditProfile = () => {

    const { user, updateUser } = useAuth();
    // console.log(user?.id)

    const [email, setEmail] = useState(user?.email);
    const [name, setName] = useState(user?.username);
    const [loading, setLoading] = useState(false);
    const [uri, setUri] = useState(user?.avatar);

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.updateUser(
                {
                    data: {
                        username: name,
                        avatar: uri
                    },
                    email: email
                }
            )
            try {
                const { data: ll, error: profileDataError } = await supabase.from('profiles').update(
                    {
                        username: name,
                        avatar_url: uri
                    }
                ).eq('id', user?.id).select("*")
                if (profileDataError) {
                    console.log("error in profile insert")
                }
                console.log(ll)

            } catch (error) {
                console.log("error in error", error)
            }

            if (error) throw error;

            updateUser({
                ...data.user,
                username: name ? name : user?.username,
                avatar: uri ? uri : user?.avatar,
            });
            router.replace('/(tabs)')
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    }

    const selectAvatar = async () => {
        const imagePicker = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        if (!imagePicker.canceled) {
            setUri(imagePicker.assets[0].uri)
            console.log(imagePicker?.assets[0].uri)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View className='bg-white flex-1'>
                        <View>
                            <Image className='w-full' source={bg.categoryImg} />
                            <Text className='absolute top-10 left-1/2  -translate-x-1/2 text-white font-bold text-2xl'>Edit Profile</Text>
                            <TouchableOpacity onPress={() => router.back()} style={{ left: 15 }} className='absolute top-10 '>
                                <Icon name='arrow-left' color={'white'} size={23} />
                            </TouchableOpacity>
                        </View>
                        {/* Profile */}
                        <View style={styles.profile} className='items-center relative'>
                            {uri ? (
                                <Image source={{ uri: uri }} style={{ width: '25%', aspectRatio: 1, }} className='rounded-full' />

                            ) : (
                                <Image source={bg.profile} style={{ width: '25%', aspectRatio: 1, height: 100 }} resizeMode='contain' />
                            )}
                            <TouchableOpacity className='' activeOpacity={0.5} style={styles.camera} onPress={selectAvatar}>
                                <LinearGradient
                                    colors={['#5151C6', '#888BF4']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.linearGradient}
                                >
                                    {uri ? (
                                        <MaterialIcons name='delete' size={20} color={'white'} />
                                    ) : (
                                        <Icon name='camera' size={20} color={'white'} />
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Form */}
                        <View className='px-8 gap-4'>
                            {/* First Name */}
                            <View className='gap-2'>
                                <Text>Full Name</Text>
                                <NameContainer
                                    email={name!}
                                    onchangetext={(name) => setName(name)}
                                />
                            </View>
                            {/* Email */}
                            <View className='gap-2'>
                                <Text>Email</Text>
                                <NameContainer
                                    email={email!}
                                    onchangetext={(email) => setEmail(email)}
                                />
                            </View>
                        </View>

                        <View style={{ top: 300, paddingHorizontal: 32 }} >
                            <AuthButton title='SAVE CHANGES' loading={loading} onpress={handleSubmit} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    profile: {
        position: 'relative',
        top: -50
    },
    camera: {
        position: 'absolute',
        bottom: 6,
        right: 160
    },
    image: {
        width: 90,
        height: 95,
    },
    linearGradient: {
        borderRadius: 7,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EditProfile