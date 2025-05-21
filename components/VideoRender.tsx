import { View, Text } from 'react-native'
import React, { memo, useEffect } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'

const VideoRender = ({ uri, isActive }: { uri: string, isActive: boolean }) => {
    const player = useVideoPlayer(uri, (player) => {
        player.loop = true;
    })
    
    useEffect(() => {
        if (!player) return;
        if (isActive) {
            player.play();
        } else {
            player.pause();
            player.seekBy(0);
        }
        // return () => {
        //     player.pause();
        //     player.seekBy(0);
        // }
    }, [isActive, player]);


    return (
        <VideoView
        nativeControls={false}
            collapsableChildren
            allowsFullscreen
            allowsPictureInPicture
            player={player}
            style={{ aspectRatio: 1, width: '100%' }}
        />
    )
}

export default memo(VideoRender)