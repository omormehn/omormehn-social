import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';

const useSocketEvents = () => {
    const { socket } = useSocket()

    useEffect(() => {


        return () => {
            socket?.off("connect");
            socket?.off("disconnect");
            socket?.disconnect();
        };
    }, []);


    return { socket };

}

export default useSocketEvents