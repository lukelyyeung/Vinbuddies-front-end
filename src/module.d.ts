declare namespace reduxRice {
    interface AuthState {
        isAuthenticated: boolean;
        isSignedUp: boolean;
    }
    interface NavigationState {
        isOpen: boolean;
    }
    interface UserProfileState {
        userId: number;
        picture: string;
        username: string;
    }   
}

declare let ChatBot: any;