
import { supabase } from "@/services/supabase"
import { useQuery } from "@tanstack/react-query"

export const useChats = (userId: any) => {
    const chats = useQuery({
        queryKey: ['chats', userId],
        queryFn: async () => {
            if (!userId) {
                console.log('soigh')
            }
            const { data: chat, error } = await supabase
                .from("chat")
                .select("*")
                .contains("users", [userId]).single()
            if (error) throw error
            console.log('dtt', chat)
            const { data: receiver, error: userError } = await supabase
                .from("profiles") // or "profiles" if you have a custom profile table
                .select("id, username, avatar_url")
                .in("id", chat.users.filter((id: any) => userId !== id)).single()
            console.log('pr,', receiver)
            console.log('errr', error)
            return [{ chat, receiver }]
        }
    });


    return { chats }
}