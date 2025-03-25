import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Logo from 'react-native-vector-icons/FontAwesome';

import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import PasswordContainer, { EmailContainer } from '@/components/InputContainer';
import AuthContainer from '@/components/AuthContainer';
import AuthButton from '@/components/AuthButton';


const Login = () => {

  const { login, error, loading } = useAuth();

  const [eyeOpen, setEyeClose] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const eyeIcon = eyeOpen ? 'eye-off' : 'eye'

  const handleEyeSwitch = () => setEyeClose(!eyeOpen);

  const router = useRouter();


  // Handle form
  const handleSubmit = async () => {
    try {
      await login(email, password);
      router.push('/(screens)')
    } catch (error) {
      console.log("error in login", error)
    }
  }




  return (
    <KeyboardAvoidWrapper >
      <AuthContainer title='WELCOME BACK'>
        {/* Form Section */}
        <AuthFormWrapper>
          <View style={{ gap: 10 }} className='px-4 pt-14'>
            {/* Email Input */}
            <EmailContainer
              email={email}
              onchangetext={(text: any) => setEmail(text)}
            />

            {/* Password Input */}
            <PasswordContainer
              placeholder="Password"
              password={password}
              onchangetext={(text: any) => setPassword(text)}
              secureTextEntry={eyeOpen ? false : true}
              iconName={eyeIcon}
              onpress={handleEyeSwitch}
            />
            {/* {error ? (
            <Text style={{ color: 'red', textAlign: 'center' }}> {cleanErrorMessage(error)}</Text>
          ) : ''} */}


            <View style={{ paddingVertical: 30, gap: 15 }} className='pt-4'>
              {/* Forgot password */}
              <TouchableOpacity onPress={() => router.push('/(auth)/ForgotPassword')}>
                <Text style={{ textDecorationStyle: 'dashed', letterSpacing: 3 }} 
                  className='text-primary text-center font-medium'
                >
                  FORGOT PASSWORD
                </Text>
              </TouchableOpacity>


              {/* Log in Button */}
              <AuthButton onpress={handleSubmit} title='LOG IN' loading={loading} />

              <Text style={{ letterSpacing: 1 }} className='text-center text-lg pt-4 '>
                OR LOG IN BY
              </Text>

              {/* Logos/ Social Platform*/}
              <View className='flex-row justify-center items-center gap-6'>
                <TouchableOpacity activeOpacity={0.5}>
                  <View className='h-14 w-14 rounded-full justify-center items-center bg-logoBg'>
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
          </View>
        </AuthFormWrapper>
      </AuthContainer >
    </KeyboardAvoidWrapper>
  )
}


export default Login