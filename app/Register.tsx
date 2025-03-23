import AuthFormWrapper from '@/components/AuthFormWrapper';
import PasswordContainer from '@/components/InputContainer';
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView';
import { bg } from '@/constants/bg';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Logo from 'react-native-vector-icons/FontAwesome';


const Register = () => {
    const [eyeOpen, setEyeClose] = useState(false);
    const [confirmPasswordEyeOpen, setConfirmPasswordEyeOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const eyeIcon = eyeOpen  ? 'eye-off' : 'eye';
    const confirmPasswordEyeIcon = confirmPasswordEyeOpen ? 'eye-off' : 'eye';

    const { register, error } = useAuth();

    const handleEyeSwitch = () => setEyeClose(!eyeOpen);
    const handleConfirmPasswordEyeSwitch = () => setConfirmPasswordEyeOpen(!confirmPasswordEyeOpen);

    const handleSubmit = async () => {
        await register(email, password, confirmPassword);
        console.log('click')
    }



    return (
        <KeyboardAvoidWrapper>
            <View className='relative h-full '>
                {/* Top Background Image Section*/}
                <View className='relative z-0'>
                    <Image source={bg.authBg} className='w-full z-0' />
                    <View className="absolute top-0 left-0 w-full h-56 bg-black opacity-30" />
                    <Text className='absolute top-10 left-1/2  -translate-x-1/2 text-gray-400 font-medium text-2xl'>Omormehn</Text>
                    <Text className='absolute top-36 left-1/2  -translate-x-1/2 text-white font-bold text-4xl'>WELCOME</Text>
                </View>

                {/* Form Section */}
                <AuthFormWrapper>
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
                    <PasswordContainer>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="gray"
                            className="text-lg w-[90%]"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={eyeOpen ? false : true}
                        />
                        <Icon name={eyeIcon} onPress={handleEyeSwitch} size={17} className='text-end absolute right-5 top-6 ' />
                    </PasswordContainer>

                    {/* Confirm Password Input */}
                    <PasswordContainer>
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="gray"
                            className="text-lg w-[90%] "
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={confirmPasswordEyeOpen ? false : true}
                        />
                        <Icon name={confirmPasswordEyeIcon} onPress={handleConfirmPasswordEyeSwitch} size={17} className='text-end absolute right-5 top-6 ' />
                    </PasswordContainer>

                    <Text className='text-red-500 text-sm absolute top-80 left-32 -translate-x-1/2'>{error ? error : ''}</Text>


                    <View style={{ paddingVertical: 30, gap: 15 }} className='justify-center items-center pt-4'>
                        {/* Sign in Button */}
                        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} className=''>
                            <LinearGradient
                                colors={['#5151C6', '#888BF4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ paddingVertical: 18, paddingHorizontal: 130, borderRadius: 25 }}
                            >
                                <Text style={{ letterSpacing: 1 }} className='text-center font-bold text-white text-base'>
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
                </AuthFormWrapper>
            </View >
        </KeyboardAvoidWrapper>
    );
}

const styles = StyleSheet.create({})

export default Register;
