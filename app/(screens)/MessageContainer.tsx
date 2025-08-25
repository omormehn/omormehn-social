import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'


const MessageContainer = () => {
    <View style={styles.container}>
        <ScrollView style={styles.header} stickyHeaderIndices={[0]}>
            {/* Head */}
        </ScrollView>
    </View>

}

export default MessageContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 30,
        zIndex: 1,

    },
})