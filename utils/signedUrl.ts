import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/services/supabase";

const SIGNED_URL_CACHE_KEY = "signed_url_cache";


const SIGNED_URL_TTL = 60 * 60 * 1000;

type CachedSignedUrl = {
  url: string;
  expiresAt: number;
};

export const getSignedUrl = async (fileName: string) => {
  try {
    const cacheString = await AsyncStorage.getItem(SIGNED_URL_CACHE_KEY);
    const cache: Record<string, CachedSignedUrl> = cacheString
      ? JSON.parse(cacheString)
      : {};

    const entry = cache[fileName];

    
    if (entry && entry.expiresAt > Date.now()) {
      return entry.url;
    }

 
    const { data, error } = await supabase.storage
      .from("files")
      .createSignedUrl(fileName, 60 * 60); // 1 hour

    if (error || !data?.signedUrl) return null;

    const newUrl = data.signedUrl;

    cache[fileName] = {
      url: newUrl,
      expiresAt: Date.now() + SIGNED_URL_TTL,
    };

    await AsyncStorage.setItem(SIGNED_URL_CACHE_KEY, JSON.stringify(cache));

    return newUrl;
  } catch (err) {
    console.log("getSignedUrl error:", err);
    return null;
  }
};
