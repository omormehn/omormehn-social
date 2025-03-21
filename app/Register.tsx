import { bg } from '@/constants/bg';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Logo from 'react-native-vector-icons/FontAwesome';


const Register = () => {
    let eyeIcon;
    const [eyeOpen, setEyeClose] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    eyeOpen ? eyeIcon = 'eye' : eyeIcon = 'eye-off'

    const { register, error } = useAuth();

    const handleEyeSwitch = () => setEyeClose(!eyeOpen);

    const handleSubmit = async () => {
        
            await register(email, password, confirmPassword);
            console.log('click')
       
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -40}
        >
            <View className='relative h-full '>
                {/* Top Background Image Section*/}
                <View className='relative'>
                    <Image source={bg.authBg} className='w-full' />
                    <View className="absolute top-0 left-0 w-full h-56 bg-black opacity-30" />
                    <Text className='absolute top-10 left-1/2  -translate-x-1/2 text-gray-400 font-medium text-2xl'>Omormehn</Text>
                    <Text className='absolute top-36 left-1/2  -translate-x-1/2 text-white font-bold text-4xl'>WELCOME</Text>
                </View>

                {/* Form Section */}
                <View className='absolute bg-white w-full h-[40rem] rounded-t-[45px] bottom-0 '>
                    {/* Form Main */}
                    <View style={{ gap: 8 }} className='pt-14 px-8 '>
                        {/* Email Input */}
                        <View className="justify-center bg-gray-100 px-4 py-2 rounded-full mb-4">
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="gray"
                                className="text-lg"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        {/* Password Input */}
                        <View className="relative justify-between  items-start bg-gray-100 px-4 py-2 rounded-full mb-4">
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="gray"
                                className="text-lg w-full"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={eyeOpen ? false : true}
                            />
                            <Icon name={eyeIcon} onPress={handleEyeSwitch} size={17} className='text-end absolute right-5 top-6 ' />
                        </View>

                        {/* Confirm Password Input */}
                        <View className="relative justify-between  items-start bg-gray-100 px-4 py-2 rounded-full mb-4">
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="gray"
                                className="text-lg w-full"
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry={eyeOpen ? false : true}
                            />
                            <Icon name={eyeIcon} onPress={handleEyeSwitch} size={17} className='text-end absolute right-5 top-6 ' />
                        </View>
                    </View>
                    <Text className='text-red-500 text-sm absolute top-80 left-32 -translate-x-1/2'>{error ? error : ''}</Text>


                    <View style={{ paddingVertical: 30, gap: 15 }} className='justify-center items-center pt-10'>
                        {/* Sign in Button */}
                        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} className=''>
                            <LinearGradient
                                colors={['#5151C6', '#888BF4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ paddingVertical: 14, paddingHorizontal: 130, borderRadius: 25 }}
                            >
                                <Text style={{ letterSpacing: 1 }} className='text-center font-bold text-white text-lg'>
                                    SIGN UP
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={{ letterSpacing: 1 }} className='text-center text-lg pt-4 '>
                            OR SIGN IN WITH
                        </Text>

                        {/* Logos/ Social Platform*/}
                        <View className='flex-row justify-center items-center gap-6'>
                            <TouchableOpacity activeOpacity={0.5}>
                                <View className='h-14 w-14 rounded-full justify-center items-center  bg-logoBg'>
                                    <Logo size={25} color='#5151C6' name='google' />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5}>
                                <View className='h-14 w-14 rounded-full justify-center items-center  bg-logoBg'>
                                    <Logo size={25} color='#5151C6' name='facebook' />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Alternative Sign In */}
                        <View className='flex-row items-center justify-center'>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('/Login')}>
                                <Text className='text-secondary font-bold text-base'>LOG IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export default Register;
