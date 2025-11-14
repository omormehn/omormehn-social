
import { supabase } from "@/services/supabase"
import { useQuery } from "@tanstack/react-query"

export const useChats = (userId?: string, chatId?: any) => {

    const chats = useQuery({
        queryKey: ['chats', userId],
        queryFn: async () => {
            if (!userId) {
                console.log('No user id')
                return;
            }
            const { data: chat, error } = await supabase
                .from("chat")
                .select(`*,
                    message (
                        id,
                        text,
                        senderId,
                        created_at
                    )`
                ).order('created_at', { referencedTable: "message", ascending: false })
                .limit(1, { referencedTable: 'message' })
                .contains("users", [userId!])
            error && console.log('err', error)

            if (error) throw error

            const receiverIds = chat
                .map(ch => ch.users.filter((id: string) => id !== userId))
                .flat();

            const { data: receivers, error: userError } = await supabase
                .from("profiles")
                .select("id, username, avatar_url")
                .in("id", receiverIds)

            if (userError) {
                console.log('error getting participant', error)
            }
            return chat.map(ch => {
                const receiver = receivers?.find(r => ch.users.includes(r.id) && r.id !== userId);

                const lastMsg = ch.message?.[0]

                const chat = {
                    id: ch.id,
                    users: ch.users,
                    receiver,
                    lastMessage: lastMsg?.text ?? "",
                    lastMessageTime: lastMsg?.created_at ?? null,
                    lastMessageSender: lastMsg?.senderId ?? null,
                }

                return { chat };
            });
        },
        enabled: !!userId
    });

    const messages = useQuery({
        queryKey: ['messages', chatId],
        queryFn: async () => {
            if (!chatId) return [];
            const { data, error } = await supabase.from('message')
                .select('*')
                .eq('chat_id', chatId!)

            if (error) {
                console.log('err', error)
            }
            return data;
        },
        enabled: !!chatId
    });



    return { chats, messages }
}