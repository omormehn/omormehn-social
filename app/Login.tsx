import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bg } from '@/constants/bg'
import Icon from 'react-native-vector-icons/Feather';
import Logo from 'react-native-vector-icons/FontAwesome';

import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { ActivityIndicator } from 'react-native';
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import PasswordContainer from '@/components/InputContainer';

const Login = () => {
  let eyeIcon;
  const [eyeOpen, setEyeClose] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, session, error, loading } = useAuth();

  eyeOpen ? eyeIcon = 'eye-off' : eyeIcon = 'eye'

  const handleEyeSwitch = () => setEyeClose(!eyeOpen);
  const cleanErrorMessage = (error: Error) => {
    const message = error.message;

    if (message.includes('Invalid `password` param:')) {
      return 'Password must be between 8 and 256 characters long.';
    }

    if (message.includes('Invalid `email` param:')) {
      return 'Please enter a valid email address.';
    }

    return message;
  };

  // Handle form
  const handleSubmit = async () => {
    await login(email, password);
  }

  useEffect(() => {
    if (session) {
      console.log('Redirecting to /(screens)');
      router.replace('/(screens)');
    }
  }, [session]);

  return (
    <KeyboardAvoidWrapper >
      <View className=' '>
        {/* Top Background Image Section*/}
        <View className='relative'>
          <Image source={bg.authBg} className='w-full' />
          <View className="absolute top-0 left-0 w-full h-56 bg-black opacity-30" />
          <Text className='absolute top-10 left-1/2  -translate-x-1/2 text-gray-400 font-medium text-2xl'>Omormehn</Text>
          <Text className='absolute top-36 left-1/2  -translate-x-1/2 text-white font-bold text-4xl'>WELCOME BACK</Text>
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
              className="text-lg w-full"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={eyeOpen ? false : true}
            />
            <Icon name={eyeIcon} onPress={handleEyeSwitch} size={17} className='text-end absolute right-5 top-6 ' />

          </PasswordContainer>
          {error ? (
            <Text style={{ color: 'red', textAlign: 'center' }}> {cleanErrorMessage(error)}</Text>
          ) : ''}


          <View className='pt-6 gap-6'>
            {/* Forgot password */}
            <TouchableOpacity>
              <Text style={{ textDecorationStyle: 'dashed', letterSpacing: 3 }} className='text-primary text-center font-medium'>FORGOT PASSWORD</Text>
            </TouchableOpacity>

            {/* Log in Button */}
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
              <LinearGradient
                colors={['#5151C6', '#888BF4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 14, borderRadius: 25 }}
              >
                {loading ? (
                  <ActivityIndicator size={20} color={'black'} />
                ) : (
                  <Text style={{ letterSpacing: 1 }} className='text-center font-bold text-white text-lg'>
                    LOG IN
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <Text style={{ letterSpacing: 1 }} className='text-center text-lg pt-4 '>
              OR LOG IN BY
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
              <Text>Don't have an account? </Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('/Register')}>
                <Text className='text-secondary font-bold text-base'>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AuthFormWrapper>
      </View >
    </KeyboardAvoidWrapper>

  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Login