import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Feather'


const PostButton = ({ title, onclick, loading }: { title: string, onclick: () => void, loading?: boolean }) => {
    return (
        <TouchableOpacity disabled={loading ? true : false} onPress={onclick} className='bg-white rounded-full p-8'>
            <Icon name={title} size={23} />
        </TouchableOpacity>
    )

}
export default PostButton
