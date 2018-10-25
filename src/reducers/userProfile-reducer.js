import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../actions/userProfile-action';

const initialUserState = { username: 'Guest', picture: 'guestuser.jpg', userId: 0 };

export function userProfileReducer(state = initialUserState, action) {
    switch (action.type) {
        case GET_PROFILE_SUCCESS: {
        return { ...state, ...action.profile  };
    }
    case GET_PROFILE_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
