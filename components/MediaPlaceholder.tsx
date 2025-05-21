import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const MediaPlaceholder = () => {
    return (
        <View style={styles.placeholderContainer}>
            <ActivityIndicator size="small" color="#999" />
        </View>
    )
}

export default MediaPlaceholder

const styles = StyleSheet.create({
    placeholderContainer: {
        aspectRatio: 1,
        width: '100%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});