import AuthButton from '@/components/AuthButton';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import PasswordContainer, { EmailContainer } from '@/components/InputContainer';
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView';
import { bg } from '@/constants/bg';
import { useAuth } from '@/context/AuthContext';
import { cleanErrorMessage } from '@/utils/error';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from 'react-native-vector-icons/FontAwesome';


const Register = () => {
    const { register, error, loading } = useAuth();


    const [eyeOpen, setEyeClose] = useState(false);
    const [confirmPasswordEyeOpen, setConfirmPasswordEyeOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const eyeIcon = eyeOpen ? 'eye-off' : 'eye';
    const confirmPasswordEyeIcon = confirmPasswordEyeOpen ? 'eye-off' : 'eye';

   
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
                    <EmailContainer
                        email={email}
                        onchangetext={(text) => setEmail(text)}
                    />

                    {/* Password Input */}
                    <PasswordContainer
                        placeholder="Password"
                        password={password}
                        onchangetext={(text) => setPassword(text)}
                        secureTextEntry={eyeOpen ? false : true}
                        iconName={eyeIcon}
                        onpress={handleEyeSwitch}
                    />

                    {/* Confirm Password Input */}
                    <PasswordContainer
                        placeholder="Confirm Password"
                        password={password}
                        onchangetext={(text) => setConfirmPassword(text)}
                        secureTextEntry={confirmPasswordEyeOpen ? false : true}
                        iconName={confirmPasswordEyeIcon}
                        onpress={handleConfirmPasswordEyeSwitch}
                    />

                    {error ? (
                        <Text style={{ color: 'red', textAlign: 'center' }}> {cleanErrorMessage(error)}</Text>
                    ) : ''}

                    <View style={{ paddingVertical: 30, gap: 15 }} className='pt-4'>
                        {/* Sign in Button */}
                        <AuthButton onpress={handleSubmit} title='SIGN UP' loading={loading} />


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
