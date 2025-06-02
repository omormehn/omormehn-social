import { SettingOption } from '@/components/SettingOption';
import { HomeFilter } from '@/components/HomeFilter';
import { User, Session } from '@supabase/supabase-js';


type CustomUser = User & {
    username?: string
}

interface AuthContextType {
    session: Session | null;
    loading: boolean;
    user: CustomUser | null;
    updateUser: (user: any) => void;
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



