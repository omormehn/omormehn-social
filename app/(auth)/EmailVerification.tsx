import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '@/components/AuthContainer'

import KeyboardAvoidWrapper from '@/components/KeyboardAvoidView'

import { bg } from '@/constants/bg'

const EmailVerification = () => {



  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);




  const handleSubmit = async () => {
    try {
      setLoading(true)
    } catch (error) {
      console.log(error);
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidWrapper>
      <AuthContainer>
        <View className='justify-center  items-center gap-8 pt-4'>
          <Text style={{}}
            className='font-bold text-lg text-secondary '>
            VERIFICATION
          </Text>

          {/* Description */}
          <View className='bg-primaryBg w-[90%] px-10 py-4 rounded-2xl'>
            <Text className='text-center text-lg font-medium '>
              A message with verification code was sent to your mobile phone.
            </Text>
          </View>

          <View className='flex-row gap-2 pt-6'>
            <Text className='font-medium text-lg'>
              Didn't Receive Verification Link?
            </Text>
            <TouchableOpacity>
              <Text onPress={handleSubmit} className='text-textColor text-lg'>
                Resend link
              </Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <ActivityIndicator
              size={20}
              className='bg-black'
            />
          )}


          <View className='pt-20 items-center'>
            <Image source={bg.authBottomImg} />
          </View>

        </View>
      </AuthContainer>
    </KeyboardAvoidWrapper>
  )
}

export default EmailVerification