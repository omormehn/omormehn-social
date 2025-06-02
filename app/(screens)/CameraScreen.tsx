import React = require('react');
import { CameraView, CameraType, useCameraPermissions, CameraMode, Camera, useMicrophonePermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Pressable, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';



const CameraScreen = () => {
  const ref = useRef<CameraView>(null);
  const { user } = useAuth();

  const [recording, setRecording] = useState(false);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

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
      if (!microphonePermission?.granted) {
        await requestMicrophonePermission();
      }
    })();
  }, [cameraPermission]);



  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
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

  const toggleFacing = () => {
    setFacing(prev => prev === 'back' ? 'front' : 'back');
  }

  const takePhoto = async () => {
    const photo = await ref.current?.takePictureAsync();
    router.push({
      pathname: "/PostScreen",
      params: {
        uri: photo?.uri,
        type: 'image'
      }
    });
  }

  const startRecording = async () => {
    if (!cameraReady || !ref.current) {
      Alert.alert('Camera not ready', 'Please wait for camera to initialize');
      return;
    }
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    try {
      setRecording(true)
      const video = await ref.current?.recordAsync();
      router.push({
        pathname: '/(screens)/PostScreen',
        params: {
          uri: video?.uri,
          type: 'video'
        }
      })
    } catch (error) {
      console.log("error recording", error)
    } finally {
      setRecording(false)
    }
  }
  const stopRecording = () => {
    if (recording && ref.current) {
      ref.current.stopRecording();
      console.log('Recording stopped');
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  if (!cameraPermission?.granted || !microphonePermission?.granted) {
    return (
      <View>
        <Text>Camera and microphone permissions are required</Text>
      </View>
    );
  }
  return (
    <SafeAreaView edges={['top', 'bottom']} className='flex-1 h-full '>
      {mounted && (
        <View className='flex-1'>
          <CameraView
            style={{ width: '100%', height: '100%', zIndex: 0 }}
            ref={ref}
            mode={mode}
            facing={facing}
            mute={false}
            onCameraReady={() => {
              console.log('camera is ready')
              setCameraReady(true)
            }}
          />
          <View className='absolute z-50 flex-col top-10 right-10 gap-8 items-center'>
            <TouchableOpacity onPress={pickMedia} className=' '>
              <Icon name="images" size={35} color="white" className='' />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFacing} className=''>
              <MaterialIcons name="cameraswitch" size={35} color="white" className='' />
            </TouchableOpacity>
          </View>

          <View style={{ position: 'absolute', width: '100%', bottom: 44, alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
            <Pressable onPress={toggleMode}>
              {mode === "picture" ? (
                <AntDesign name="picture" size={32} color="white" />
              ) : (
                <Feather name="video" size={32} color="white" />
              )}
            </Pressable>
            <TouchableOpacity
              onPress={mode === "picture" ? takePhoto : toggleRecording}
              style={[
                styles.shutterBtn,
                recording && { borderColor: 'red' }
              ]}
            >
              <View style={[
                styles.shutterBtnInner,
                recording && { backgroundColor: 'red' }
              ]} />
            </TouchableOpacity>
          </View>
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
    color: 'white',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});


export default CameraScreen;
