import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import { Socket } from 'socket.io-client';

interface SocketEvents {
    updateLastMessage?: (data: any) => void
}

const useSocketEvents = (socket: Socket | null, { updateLastMessage }: SocketEvents) => {

    useEffect(() => {
        updateLastMessage && socket?.on('updateLastMessage', updateLastMessage)


        return () => {
            socket?.off('updateLastMessage', updateLastMessage)
        };
    }, [socket, updateLastMessage]);


    return { updateLastMessage };

}

export default useSocketEvents