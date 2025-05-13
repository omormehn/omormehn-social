import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { bg } from '@/constants/bg'
import Icon from 'react-native-vector-icons/Feather'
import { LinearGradient } from 'expo-linear-gradient'
import { NameContainer } from '@/components/InputContainer'
import { useAuth } from '@/context/AuthContext'
import AuthButton from '@/components/AuthButton'
import { router } from 'expo-router'

const EditProfile = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

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
                        <View style={styles.profile} className='items-center '>
                            <Image source={bg.profile} style={{ width: 100, height: 105, }} resizeMode='cover' />
                            <TouchableOpacity activeOpacity={0.5} style={styles.camera} onPress={() => { }}>
                                <LinearGradient
                                    colors={['#5151C6', '#888BF4']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.linearGradient}
                                >
                                    <Icon name='camera' size={20} color={'white'} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Form */}
                        <View className='px-8 gap-4'>
                            {/* First Name */}
                            <View className='gap-2'>
                                <Text>Full Name</Text>
                                <NameContainer
                                    email={name}
                                    onchangetext={() => setName(name)}
                                  
                                />
                            </View>
                            {/* Email */}
                            <View className='gap-2'>
                                <Text>Email</Text>
                                <NameContainer
                                    email={email}
                                    onchangetext={() => setEmail(email)}
                                    // placeHolder={user?.email!}
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
        right: 135
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