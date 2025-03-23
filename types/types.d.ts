interface EmailProps {
    email: string
    onchangetext: (text:string) => void;
}
interface PasswordProps {
    password: string
    placeholder: string
    onchangetext: (text:string) => void;
    secureTextEntry: boolean;
    iconName: string;
    onpress: () => void;
}

interface AuthButtonProps {
    title: string;
    onpress: () => void;
    loading: boolean;
}
interface AuthContextType {
    user: any | null;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, confirmPassword: string) => void;
    logout: () => void;
    session: any | null;
    error: any | null;
    loading: boolean;
}
