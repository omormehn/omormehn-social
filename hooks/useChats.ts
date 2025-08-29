
import { supabase } from "@/services/supabase"
import { useQuery } from "@tanstack/react-query"

export const useChats = (userId: any) => {
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
                .contains("users", [userId]).single()
            if (error) throw error
            const { data: receiver, error: userError } = await supabase
                .from("profiles")
                .select("id, username, avatar_url")
                .in("id", chat.users.filter((id: any) => userId !== id)).single()

            if (userError) {
                console.log('error getting participant', error)
            }
            return [{ chat, receiver }]
        }
    });


    return { chats }
}