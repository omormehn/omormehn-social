import { supabase } from "@/services/supabase";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { LikeContextProps } from "@/types/types";



const LikeContext = createContext<LikeContextProps | null>(null);

const LikeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [count, setCount] = useState(0);

    const fetchLikes = async (postId: string) => {
        const { count, error: countError } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', postId)
        if (countError) throw countError;
        const { data: likesData } = await supabase.from('likes').select('*').eq('post_id', postId).eq('user_id', user?.id).maybeSingle();
        setCount(count!)
        return { count, likesData }
    }

    const addLike = async (postId: string) => {
        const { error } = await supabase.from('likes').insert([
            {
                user_id: user?.id,
                post_id: postId
            }
        ]);
        if (error) {
            console.log('error delete', error)
        }
    }
    const deleteLike = async (postId: string) => {
        const { error } = await supabase.from('likes').delete().eq('user_id', user?.id).eq('post_id', postId);
        if (error) {
            console.log('error delete', error)
        }
    }

    const value = useMemo(() => {
        return {
            fetchLikes,
            addLike,
            deleteLike,
            count
        }
    }, [fetchLikes, addLike, deleteLike, count])
    return (
        <LikeContext.Provider value={value}>
            {children}
        </LikeContext.Provider>
    )
}

export const useLikes = () => {
    const likeContext = useContext(LikeContext);
    if (!likeContext) {
        "must be within a provider"
    }
    return likeContext;
}

export default LikeContextProvider;