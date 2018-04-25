import { ALERT_ERROR, ALERT_INFO, ALERT_LOADING, ALERT_SUCCESS, NO_ALERT } from "./actions/alert-action";

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
    interface AlertState {
        type:  string;
        message: string | null;
    }
}

declare let ChatBot: any;