import { CameraView, CameraType, useCameraPermissions, CameraMode } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';
import { decode } from 'base64-arraybuffer';
import { router } from 'expo-router';
import { pickImage } from '@/utils/camaera';


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

  useEffect(() => {
    (async () => {
      if (!cameraPermission?.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestCameraPermission} title="grant permission" />
          </View>
        );
      }
      if (!mediaLibraryPermission?.granted) {
        await requestMediaLibraryPermission();
        return (
          <View style={styles.container}>
            <Text>No access to camera or media library. Please enable permissions in settings.</Text>
          </View>
        );
      }
    })();
  }, [cameraPermission]);

  useEffect(() => {
    if (!user) return;

    loadImages();
  }, [user]);


  const loadImages = async () => {
    const { data } = await supabase.storage.from('files').list(user?.id);
    if (data) {
      setFiles(data);
    }
  }

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
        }
      });
    }
    return result;
  }

  const renderPhoto = async () => {

  }



  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <Pressable onPress={pickMedia}>
            <Icon name="images" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    </View>
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
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
