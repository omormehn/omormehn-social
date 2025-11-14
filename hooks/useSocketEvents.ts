import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import { Socket } from 'socket.io-client';

interface SocketEvents {
    updateLastMessage?: (data: any) => void
    receiveMessage?: (data: any) => void
}

const useSocketEvents = (socket: Socket | null, { updateLastMessage, receiveMessage }: SocketEvents) => {

    useEffect(() => {
        updateLastMessage && socket?.on('updateLastMessage', updateLastMessage)
        receiveMessage && socket?.on('receiveMessage', receiveMessage)

        return () => {
            socket?.off('updateLastMessage', updateLastMessage)
            socket?.off('receiveMessage', receiveMessage)
        };


    }, [socket, updateLastMessage, receiveMessage]);


    return { updateLastMessage, receiveMessage };

}

export default useSocketEvents