import React, { memo, useCallback, useEffect, useState } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const VideoRender = ({ uri, isActive, height = 510, permit = true }: { uri: string, isActive?: boolean, height?: number, permit?: boolean }) => {
    const [videoEnd, setVideoEnd] = useState(false);
    const [isMute, setMute] = useState(false);

    const player = useVideoPlayer(uri, (player) => {
        player.loop = false
    });

    useEffect(() => {
        if (!player) return;

        const onVideoEnd = () => {
            setVideoEnd(true)
        }
        player.addListener('playToEnd', onVideoEnd)

        return () => {
            player.removeListener('playToEnd', onVideoEnd)
        }
    }, [player])


    useEffect(() => {
        if (!player) return;
        if (isActive) {
            player.play();
        } else {
            player.pause();
            player.seekBy(0)
        }
    }, [isActive, player]);

    const replayVideo = useCallback(() => {
        if (!player) return;
        player.replay()
        player.play()
        setVideoEnd(false);
    }, [player])

    const muteVideo = useCallback(() => {
        if (!player) return;
        player.muted = !player.muted
        setMute(!player.muted)
    }, [player])

    return (
        <View style={styles.contentContainer} >
            <VideoView
                nativeControls={false}
                collapsableChildren
                allowsFullscreen
                allowsPictureInPicture
                player={player}
                contentFit='cover'
                style={{
                    height: height,
                    width: 410
                }}
                className='w-full '
            />
            {videoEnd ? (
                <TouchableOpacity onPress={replayVideo} className='absolute border-2 border-white rounded-full px-5 py-2'>

                    <View className='flex justify-center items-center'>
                        <Text className='text-white text-xl'>Play again</Text>
                    </View>
                </TouchableOpacity>
            ) : permit && (
                <TouchableOpacity activeOpacity={0.5} onPress={muteVideo} style={{ position: 'absolute', bottom: 15, right: 15, backgroundColor: "gray", paddingVertical: 2, paddingHorizontal: 2, borderRadius: 30 }}>
                    <MaterialIcons name={isMute ? "volume-off" : "volume-up"} size={18} color={'black'} />
                </TouchableOpacity>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});
export default memo(VideoRender)