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
    const { data } = await supabase.storage.from('files').list(user.id);
    if (data) {
      setFiles(data);
    }
  }

  const pickMedia = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!result.canceled) {
        const img = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
        const filePath = `${user.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
        const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
        await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
        await loadImages();
      }
      router.push("/(tabs)");
    } catch (error) {
      console.error("Error picking media: ", error);
    }
  };


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
    justifyContent: 'center',
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
