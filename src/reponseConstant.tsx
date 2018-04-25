const AUTH_STATUS = require('./constant/authConstant');
const USER_STATUS = require('./constant/userConstant');
const QUESTION_STATUS = require('./constant/questionConstant');
const QUESTION_HISTORY_STATUS = require('./constant/questionHistoryConstant');
const EVENT_STATUS = require('./constant/eventConstant');
const GENERAL_STATUS = require('./constant/generalConstant');

export const messageMap = {
     // General status error code
     [GENERAL_STATUS.NOT_AUTHORIZED]: 'You are not authorized for this resource.',
     [GENERAL_STATUS.DATABASE_ERROR]: 'There are some errors in our database.',
     [GENERAL_STATUS.UPLOAD_FAIL]: 'The file is failed to be uploaded.',
     [GENERAL_STATUS.SERVER_ERROR]: 'There are some errors in our server.',
     [GENERAL_STATUS.UNKNOWN_ERROR]: 'Something is going wrong.\nPleae try again.',
     // Auth status error code
     [AUTH_STATUS.SIGNUP_USER_EXIST]: 'This email has been used.\nPlease try with another one.',
     [AUTH_STATUS.LOGIN_INVALID]: 'Invalid Password.\nPlease try again.',
     [AUTH_STATUS.INVALID_INPUT]: 'Invalid input.\nPlease try again.',
     [AUTH_STATUS.LOGIN_NO_USER]: 'No user is found.\nPlease try with another email.',
     [AUTH_STATUS.LOGIN_USER_DELETED]: 'The user account has been deleted.',
     [AUTH_STATUS.LOGIN_NO_ACCESSTOKEN]: 'No valid access token is found.',
     [AUTH_STATUS.LOGIN_SUCCESSFUL]: 'You have successfully logged in.',
     [AUTH_STATUS.SIGNUP_SUCCESSFUL]: 'Successfully signed up.',

     // User info status error code
     [USER_STATUS.NO_USER]: 'No user is found.',
     [USER_STATUS.USER_EXIST]: 'The user exists.',
     [USER_STATUS.INFO_USED]: 'The email has been used.',

     // Question API status error code
     [QUESTION_STATUS.READ_FAIL_NO_QUESTION]: 404,
     [QUESTION_STATUS.POST_FAIL_INVALID_INPUT]: 412,

     // Question history API status error code
     [QUESTION_HISTORY_STATUS.POST_HISTORY_FAIL]: 404,
     [QUESTION_HISTORY_STATUS.INVALID_OPTION]: 404,
     [QUESTION_HISTORY_STATUS.GET_HISTORY_FAIL]: 404,
     [QUESTION_HISTORY_STATUS.DELETE_HISTORY_FAIL]: 404,

     // Event & event journal API status error code
     [EVENT_STATUS.NOT_FOUND]: 'Cannot find the event\nPlease try again.',
     [EVENT_STATUS.UPDATE_FAIL]: 'Fail to update the event.',
     [EVENT_STATUS.DELETE_FAIL]: 'Fail to delete the event.'
};