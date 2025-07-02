import { SettingOption } from '@/components/SettingOption';
import { HomeFilter } from '@/components/card/HomeFilter';
import { User, Session } from '@supabase/supabase-js';
import { Ref } from 'react';


type Prop = {
    bottomSheetRef: React.RefObject<any>;
    uploader?: string;
}
type Comment = {
    id: string;
    comment: string;
    user_name: string;
    avatar: string;
    user_id: string;
    created_at: string;
}

type CommentUpdater = Comment[] | ((prev: Comment[]) => Comment[]);

type CommentContextProp = {
    openDrawer: (postId: string, uploader: string) => void;
    fetchComments: (postId: string) => Promise<void>;
    comments: Comment[];
    addComment: (userId: string, username: string , comment: string, postId: string, avatar: string) => Promise<any>;
    loading: boolean;
    countComments: (postId: string) => Promise<number>;
    commentCount: Record;
    currentPost: any;
    bottomSheetRef: Ref
};


type CustomUser = User & {
    username?: string
    avatar?: string
}

interface AuthContextType {
    session: Session | null;
    loading: boolean;
    user: CustomUser | null;
    updateUser: (user: any) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}
interface AppContextProps {
    user: { emailVerified?: boolean } | null;
    hasSeenOnboarding: boolean;
    hasSelectedCategory: boolean;
    loading: boolean;
}
interface EmailProps {
    email: string
    onchangetext: (text: string) => void;
    value?: string
    placeHolder?: string
}
interface PasswordProps {
    password: string
    placeholder: string
    onchangetext: (text: string) => void;
    secureTextEntry: boolean;
    iconName: string;
    onpress: () => void;
}

interface AuthButtonProps {
    title: string;
    onpress?: () => void;
    loading?: boolean;
}


type AuthVerificationProps = {
    title: string;
    description: string;
    children: React.ReactNode;
    onpress: () => void;
    loading: boolean;
    name: string;
}

type HomeFilterProps = {
    title: string,
    focus?: boolean,
    onpress: () => void;
    w?: any
}

interface TabBarProps {
    iconPath: any
    iconPath1: any
    focused: any
}

interface HomeCardProps {
    username: string
    profileImg?: any
    createdAt: any
    postImage: any
    commentNo: number
    likesNo: number
}



