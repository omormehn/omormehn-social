import React, { JSXElementConstructor } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const KeyboardAvoidWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <KeyboardAvoidingView className='flex-1' behavior='height' keyboardVerticalOffset={250}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export default KeyboardAvoidWrapper;
