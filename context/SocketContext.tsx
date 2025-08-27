import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { SocketContextProps } from "@/types/types";

const SocketContext = createContext<SocketContextProps | null>(null)

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    const [onlineUsers, setOnlineUsers] = useState<[]>([])
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        try {
            const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
                autoConnect: false,
                query: {
                    userId: user?.id,
                },
            });
            socket.connect();
            setSocket(socket)

            return () => {
                socket.disconnect()
            }
        } catch (error) {

        }
    }, [user]);

    useEffect(() => {
        socket?.on('getOnlineUsers', (onlineUsers) => {
            setOnlineUsers(onlineUsers)
        })
    })
    const value = {
        socket,
        onlineUsers
    }

    return (
        <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) throw new Error("Must be within an auth provider")
    return context;
}