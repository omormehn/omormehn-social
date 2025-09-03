import { format } from 'date-fns'

export const formatMessageTime = (messageTime: string) => {
    if (!messageTime) return;
    const now = new Date();
    const msgDate = new Date(messageTime);

    const diffInSeconds = Math.floor((now.getTime() - msgDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "just now";
    }
    return format(messageTime, "HH:mm")

};