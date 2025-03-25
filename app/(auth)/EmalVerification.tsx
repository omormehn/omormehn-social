import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '@/components/AuthContainer'
import AuthVerificationContainer from '@/components/AuthVerificationContainer'
import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView'
import { EmailContainer } from '@/components/InputContainer'
const EmailVerification = () => {

  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');


  const handleSubmit = () => { }

  return (
    <KeyboardAvoidWrapper>
      <AuthContainer>
        <AuthVerificationContainer
          title='Type Your Email'
          description='A message with verification code was sent to your mobile phone.'
          name='VERIFY'
          onpress={handleSubmit}
          loading={loading}
        >
          <View className=''>
            <TextInput
              placeholder='Type verification code'
              value={verificationCode}
              onChangeText={() => setVerificationCode(verificationCode)}
              className='text-lg'
            />
          </View>


        </AuthVerificationContainer>
      </AuthContainer>
    </KeyboardAvoidWrapper>
  )
}

export default EmailVerification