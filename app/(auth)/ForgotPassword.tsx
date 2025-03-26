import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '@/components/AuthContainer'
import AuthVerificationContainer from '@/components/AuthVerificationContainer'
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView'
import { EmailContainer } from '@/components/InputContainer'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { router } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');


  const handleSubmit = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert("Email reset link sent");
      router.push('/Login');
    } catch (error) {
      console.log(error)
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidWrapper>
      <AuthContainer>
        <AuthVerificationContainer
          title='Type Your Email'
          description='We will send you instruction on how to reset your password'
          name='SEND'
          onpress={handleSubmit}
          loading={loading}
        >
          <View className=''>
            <EmailContainer email={email} onchangetext={(text) => setEmail(text)} />
          </View>
        </AuthVerificationContainer>
      </AuthContainer>
    </KeyboardAvoidWrapper>
  )
}

export default ForgotPassword