import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { generalAlert } from '../settings/alertSetting';
import { messageMap } from '../reponseConstant';

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

const { REACT_API_SERVER } = process.env;

function getProfileSucess(profile) {
    return {
        type: GET_PROFILE_SUCCESS,
        profile: profile
    };
}

function getProfileFailure(message) {
    return {
        type: GET_PROFILE_FAILURE,
        message: message
    };
}

export function getUserProfile(JWTtoken) {
    let user = jwt_decode(JWTtoken);
    return (dispatch) => {
        if (!user.id) {
            return dispatch(getProfileFailure('Unknown Error'));
        }
        return axios({
            method: 'GET',
            url: `${REACT_API_SERVER}/user/${user.id}`,
            headers: { Authorization: `Bearer ${JWTtoken}` }
        })
            .then(response => {
                if (response.data == null) {
                    return dispatch(getProfileFailure('Unknown Error'));
                } else if (response.data.error) {
                    toast.error(messageMap[response.data.error], generalAlert);
                    return dispatch(getProfileFailure(response.data.error || ''));
                } else {
                    let { id, picture, username } = response.data;
                    toast.success(`Welcome back! ${username}`, generalAlert);
                    return dispatch(getProfileSucess({
                        userId: id,
                        username: username,
                        picture: picture
                    }));
                }
            })
            .catch(err => {
                toast.error(messageMap[err.response.data.error], generalAlert);
            });
    };
}
