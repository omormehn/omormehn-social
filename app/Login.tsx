import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bg } from '@/constants/bg'
import Logo from 'react-native-vector-icons/FontAwesome';

import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { ActivityIndicator } from 'react-native';
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import PasswordContainer, { EmailContainer } from '@/components/InputContainer';
import AuthContainer from '@/components/AuthContainer';
import AuthButton from '@/components/AuthButton';
import { cleanErrorMessage } from '@/utils/error';
import SplashScreen from '@/components/SplashScreen';

const Login = () => {

  const { login, session, error, loading, user } = useAuth();


  const [eyeOpen, setEyeClose] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const eyeIcon = eyeOpen ?  'eye-off' : 'eye'

  const handleEyeSwitch = () => setEyeClose(!eyeOpen);


  // Handle form
  const handleSubmit = async () => {
    await login(email, password);
  }
  

  useEffect(() => {
    if (session && user) {
      console.log('Redirecting to /(screens)');
      router.replace('/(screens)');
    }
  }, [session, user]);

  return (
    <KeyboardAvoidWrapper >
      <AuthContainer title='WELCOME BACK'>
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
          {error ? (
            <Text style={{ color: 'red', textAlign: 'center' }}> {cleanErrorMessage(error)}</Text>
          ) : ''}


          <View style={{ paddingVertical: 30, gap: 15 }} className='pt-4'>
            {/* Forgot password */}
            <TouchableOpacity>
              <Text style={{ textDecorationStyle: 'dashed', letterSpacing: 3 }} className='text-primary text-center font-medium'>FORGOT PASSWORD</Text>
            </TouchableOpacity>


            {/* Log in Button */}
            <AuthButton onpress={handleSubmit} title='LOG IN' loading={loading} />

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
      </AuthContainer >
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