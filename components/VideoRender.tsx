import { View, Text, Dimensions } from 'react-native'
import React, { memo, useEffect } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'

const VideoRender = ({ uri, isActive }: { uri: string, isActive?: boolean }) => {
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
    }, [isActive, player]);

    return (
        <VideoView
            nativeControls={false}
            collapsableChildren
            allowsFullscreen
            allowsPictureInPicture
            player={player}
            contentFit='cover'
            style={{
                aspectRatio: 1
            }}
            className='w-full '
        />
    )
}

export default memo(VideoRender)