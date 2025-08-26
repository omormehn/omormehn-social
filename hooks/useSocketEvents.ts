import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { io } from "socket.io-client";
import { useAuth } from '@/context/AuthContext';
const useSocketEvents = () => {

    const { user } = useAuth()

    const socket = io("http://10.0.2.2:5000", {
        transports: ["websocket"],
    });

    useEffect(() => {
        console.log('ss')
        socket.on("connect", () => {
            console.log("✅ Connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected");
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    return { socket };


}

export default useSocketEvents