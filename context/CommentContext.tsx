import CommentDrawer from "@/components/CommentDrawer";
import { supabase } from "@/services/supabase";
import { CommentContextProp, CommentUpdater } from "@/types/types";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useContext, useState, useCallback, useMemo, createContext, useRef } from "react";



const CommentContext = createContext<CommentContextProp | null>(null);
export const CommentContextProvider = ({ children }: { children: React.ReactNode }) => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const [currentPost, setCurrentPost] = useState<{ id: string, uploader: string } | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [commentCount, setCommentCount] = useState<Record<string, number>>({});



    const postIdRef = useRef<string | null>(null);
    const uploaderRef = useRef<string | null>(null);

    const openDrawer = useCallback(async (postId: string,  uploader: string) => {
        setCurrentPost({ id: postId, uploader });
        await fetchComments(postId);
        setTimeout(() => {
            bottomSheetRef.current?.expand();
        }, 5);
    }, []);

    const fetchComments = useCallback(async (postId: string) => {
        if (!postId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("comments")
                .select("*")
                .eq("post_id", postId)
                .order("created_at", { ascending: false });

            if (error) {
                console.error('Error fetching comments:', error);
            } else {
                setComments(data || []);
                setCommentCount(prev => ({
                    ...prev,
                    [postId!]: data?.length || 0
                }));
            }
        } catch (error) {
            console.error('Error in fetchComments:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const countComments = useCallback(async (postId?: string) => {
        if (!postId) return 0;
        try {
            const { count, error } = await supabase
                .from("comments")
                .select("*", { count: "exact", head: true })
                .eq("post_id", postId);
            console.log('count', count)
            if (error) {
                console.error('Error counting comments:', error);
                return 0;
            }
            setCommentCount(prev => ({
                ...prev,
                [postId]: count || 0
            }));
            return count || 0;
        } catch (error) {
            console.error('Error in countComments:', error);
            return 0;
        }
    }, []);

    const addComment = useCallback(async (userId: string, username: string, comment: string, postId: string, avatar: string) => {
        try {
            const { data, error } = await supabase
                .from('comments')
                .insert([{
                    comment,
                    user_id: userId,
                    post_id: postId,
                    user_name: username,
                    avatar: avatar
                }])
                .select();
            console.log(comment, postId, username, userId)
            if (error) {
                console.error('Error inserting comment:', error);
            }

            if (data && data.length > 0) {
                setComments(prev => [data[0], ...prev]);
                setCommentCount(prev => ({
                    ...prev,
                    [postId]: (prev[postId] || 0) + 1
                }));
            }

            return data?.[0];
        } catch (error) {
            console.log('Error in handleSubmit:', error);
        }
    }, [])

    const value = useMemo(() => {
        return {
            openDrawer,
            fetchComments,
            comments,
            loading,
            countComments,
            commentCount,
            addComment,
            currentPost
        }
    }, [openDrawer, fetchComments, comments, loading, countComments, commentCount, addComment, currentPost]);


    return (
        <CommentContext.Provider value={value}>
            {children}
            {currentPost && <CommentDrawer key={currentPost.id} uploader={uploaderRef.current!} bottomSheetRef={bottomSheetRef} />}
        </CommentContext.Provider>
    )
}

export const useCommentDrawer = () => {
    const commentContext = useContext(CommentContext);
    if (!commentContext) {
        throw new Error("must be withing a provider")
    }
    return commentContext;
}