import AuthButton from '@/components/AuthButton';
import AuthContainer from '@/components/AuthContainer';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import PasswordContainer, { EmailContainer } from '@/components/InputContainer';
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView';
import { bg } from '@/constants/bg';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/services/firebaseConfig';
import { cleanErrorMessage } from '@/utils/error';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Redirect, useRouter } from 'expo-router';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from 'react-native-vector-icons/FontAwesome';



const Register = () => {

    const { register, error, loading, message } = useAuth();
    const router = useRouter();

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
        try {
            await register(email, password, confirmPassword);


        } catch (error) {
            if (!error) { router.push('/(screens)') }
            console.log("error in reg", error)
        }
    }



    return (
        <KeyboardAvoidWrapper>
            <AuthContainer title='WELCOME'>
                {/* Form Section */}
                <AuthFormWrapper>
                    <View style={{ gap: 10 }} className='px-4 pt-14'>
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
                            password={confirmPassword}
                            onchangetext={(text) => setConfirmPassword(text)}
                            secureTextEntry={confirmPasswordEyeOpen ? false : true}
                            iconName={confirmPasswordEyeIcon}
                            onpress={handleConfirmPasswordEyeSwitch}
                        />

                        {error ? (
                            <Text style={{ color: 'red', textAlign: 'center' }}>
                                {cleanErrorMessage(error)}
                            </Text>
                        ) : ''}

                        <View style={{ paddingVertical: 30, gap: 15 }} className='pt-4'>
                            {/* Sign in Button */}
                            <AuthButton onpress={handleSubmit} title='SIGN UP' loading={loading} />
                            {message && <Text>{message}</Text>}

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
                                    <Text className='text-secondary font-bold text-base'>
                                        LOG IN
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </AuthFormWrapper>
            </AuthContainer >
        </KeyboardAvoidWrapper>
    );
}


export default Register;
