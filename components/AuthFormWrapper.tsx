import React, { Children } from 'react';
import { StyleSheet, View } from 'react-native';

const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        // Form section
        <View style={{top:-40}} className='bg-white w-full h-full rounded-t-[45px] bottom-0 '>
            {/* Form main */}
            <View style={{ gap: 10 }} className='pt-14 px-4'>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AuthFormWrapper;
