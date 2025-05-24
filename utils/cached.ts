import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = 'cached_media';
const CACHE_EXPIRY = 15 * 60 * 1000;

export const getCachedMedia = async () => {
    try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (!cachedData) return;

        const { timestamp, data } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
            return data;
        }
        return null;
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
}

export const setCachedMedia = async (data: any) => {
    try {
        const cacheValue = JSON.stringify({
            timestamp: Date.now(),
            data
        });

        await AsyncStorage.setItem(CACHE_KEY, cacheValue);
    } catch (error) {
        console.error('Cache write error:', error);
    }
}