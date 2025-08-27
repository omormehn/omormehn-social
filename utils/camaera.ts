import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAuth } from '@/context/AuthContext';
// import { supabase } from '@/services/supabase';
import { router } from 'expo-router';
// import { User } from '@supabase/supabase-js';

const { user } = useAuth();




// export const pickImage = async (user: User, loadImages: (user: User) => void) => {
//     try {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const img = result.assets[0];
//             const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
//             const filePath = `${user.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
//             const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
//             await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
//             await loadImages(user);
//         }
//         router.push("/(tabs)");
//     } catch (error) {
//         console.error("Error picking media: ", error);
//     }
// };