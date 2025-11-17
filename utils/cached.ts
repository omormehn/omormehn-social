import AsyncStorage from "@react-native-async-storage/async-storage";

interface MediaItem {
  id: string;
  name: string;
  created_at: string;
  [key: string]: any;
}

interface MediaFingerprint {
  id: string | number;
  name: string;
  created_at: string | number;
}

const CACHE_KEY = "cached_media";
const CACHE_EXPIRY = 15 * 60 * 1000;

const getMediaFingerprint = (mediaList: MediaItem[]): MediaFingerprint[] => {
  return mediaList.map((item) => ({
    id: item.id,
    name: item.name,
    created_at: item.created_at,
  }));
};

export const getCachedMedia = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    if (!cachedData) return null;
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRY) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Cache read error:", error);
    return null;
  }
};

export const setCachedMedia = async (data: any) => {
  try {
    const cacheValue = JSON.stringify({
      timestamp: Date.now(),
      data,
    });

    await AsyncStorage.setItem(CACHE_KEY, cacheValue);
  } catch (error) {
    console.error("Cache write error:", error);
  }
};

export const isMediaChanged = (
  cached: MediaItem[] | null,
  fresh: MediaItem[] | null
) => {
  if (!cached || !fresh) return true;
  if (cached.length !== fresh.length) return true;

  const cachedFingerprint = getMediaFingerprint(cached);
  const freshFingerprint = getMediaFingerprint(fresh);

  return cachedFingerprint.some((cachedItem, index) => {
    const freshItem = freshFingerprint[index];
    return (
      cachedItem.id !== freshItem.id ||
      cachedItem.name !== freshItem.name ||
      cachedItem.created_at !== freshItem.created_at
    );
  })

};
