
import { supabase } from "@/services/supabase"
import { useQuery } from "@tanstack/react-query"

export const useChats = (userId: any, chatId?: any) => {
    // if (!userId) {
    //     return null
    // }
    const chats = useQuery({
        queryKey: ['chats', userId],
        queryFn: async () => {
            if (!userId) {
                console.log('No user id')
                return;
            }
            const { data: chat, error } = await supabase
                .from("chat")
                .select("*")
                .contains("users", [userId])
            console.log(error)

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
                return { chat: ch, receiver };
            });
        }
    });

    const messages = useQuery({
        queryKey: ['messages', chatId],
        queryFn: async () => {
            if (!chatId) return [];
            const { data, error } = await supabase.from('message').select('*').eq('chat_id', chatId)

            if (error) {
                console.log('err', error)
            }
            return data;
        }
    });



    return { chats, messages }
}