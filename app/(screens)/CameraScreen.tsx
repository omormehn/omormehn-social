import React = require('react');
import { CameraView, CameraType, useCameraPermissions, CameraMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import Icon from 'react-native-vector-icons/FontAwesome6';

import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';



const CameraScreen = () => {
  const ref = useRef<CameraView>(null);
  const { user } = useAuth();

  const [recording, setRecording] = useState(false);
  const [uri, setUri] = useState<string | null>(null);
  const [files, setFiles] = useState<any>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>('back');
  const [albums, setAlbums] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const supportedRatios = ['16:9', '4:3', '3:2', '1:1'];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    (async () => {
      if (!cameraPermission?.granted) {
        await requestCameraPermission();
      }

      if (!mediaLibraryPermission?.granted) {
        await requestMediaLibraryPermission();
      }
    })();
  }, [cameraPermission]);




  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
      setUri(result.assets[0].uri);
      router.push({
        pathname: "/PostScreen",
        params: {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName
        }
      });

    }
    return result;
  }

  const takePhoto = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri!)
    router.push({
      pathname: "/PostScreen",
      params: {
        uri: photo?.uri,
        type: 'image'
      }
    });
  }


  return (
    <SafeAreaView edges={['top', 'bottom']} className='flex-1 h-full '>
      {mounted && (
        <View className='flex-1'>
          <TouchableOpacity onPress={pickMedia} className='absolute z-50 bottom-2 '>
            <Icon name="images" size={32} color="white" className='' />
          </TouchableOpacity>

          <View style={{ position: 'absolute', width: '100%', bottom: 44, alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
            <TouchableOpacity onPress={takePhoto} style={styles.shutterBtn} >
              <View style={styles.shutterBtnInner} className='bg-white w-28 size-20 rounded-full' />
            </TouchableOpacity>
          </View>
          <CameraView
            style={{ width: '100%', height: '100%', zIndex: 0 }}
            ref={ref}
            mode={mode}
            facing={facing}
            mute={false}
            responsiveOrientationWhenOrientationLocked
          />
        </View>
      )}

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  shutterContainer: {
    position: "absolute",
    bottom: 70,
    left: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 30,

  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});


export default CameraScreen;
