import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = () => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: '#F3F5F7',
            paddingVertical: 3,
            paddingHorizontal: 15,
            borderRadius: 20,
            width: 300
        }}  >
            <Icon name='search' size={20} color='#5151C6' className='' />
            <View style={{ width: 290 }}>
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={'black'}
                />
            </View>
        </View>
    )
}

export default SearchBar