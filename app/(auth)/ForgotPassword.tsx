import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '@/components/AuthContainer'
import AuthVerificationContainer from '@/components/AuthVerificationContainer'
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView'
import { EmailContainer } from '@/components/InputContainer'

const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');


  const handleSubmit = () => { }

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