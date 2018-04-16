import { Dispatch } from 'redux';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import env from '../env';
const ENV = env.dev;

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export type GET_PROFILE_SUCCESS = typeof GET_PROFILE_SUCCESS;

export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export type GET_PROFILE_FAILURE = typeof GET_PROFILE_FAILURE;

export interface GetProfileSuccessAction {
    type: GET_PROFILE_SUCCESS;
    profile: reduxRice.UserProfileState;
}

export interface GetProfileFailureAction {
    type: GET_PROFILE_FAILURE;
    message: string;
}

export type ProfileAction = GetProfileSuccessAction | GetProfileFailureAction;

function getProfileSucess(profile: reduxRice.UserProfileState) {
    return {
        type: GET_PROFILE_SUCCESS,
        profile: profile
    };
}

function getProfileFailure(message: string) {
    return {
        type: GET_PROFILE_FAILURE,
        message: message
    };
}

export function getUserProfile(JWTtoken: string) {
    let user = jwt_decode(JWTtoken) as any;
    return (dispatch: Dispatch<ProfileAction>) => {
        if (!user.id) {
            return dispatch(getProfileFailure('Unknown Error'));
        }
        return axios({
            method: 'GET',
            url: `${ENV.api_server}/user/${user.id}`,
            headers: { Authorization: `Bearer ${JWTtoken}` }
        })
            .then(response => {
                if (response.data == null) {
                    return dispatch(getProfileFailure('Unknown Error'));
                } else if (response.data.error) {
                    return dispatch(getProfileFailure(response.data.err || ''));
                } else {
                    let { id, picture, username } = response.data;
                    return dispatch(getProfileSucess({
                        userId: id,
                        username: username,
                        picture: picture
                    }));
                }
            })
            .catch(err => {
                alert(`Error: ${err.response.status}\n Message: ${err.response.data.error}`);
            });
    };
}