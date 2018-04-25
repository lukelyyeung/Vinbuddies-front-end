const USER_STATUS = {
    //* Successful status
    GET_SUCCESSFUL:'GET_USER_SUCCESSFUL',
    CREATE_SUCCESSFUL: 'CREATE_USER_SUCCESSFUL',
    DELETE_SUCCESSFUL: 'DELETE_USER_SUCCESSFUL',
    UPDATE_SUCCESSFUL: 'UPDATE_USER_SUCCESSFUL',
    NO_ENTITY: 'MODIFY_USER_NO_ENTITY',
    //* Failed status
    NO_USER: 'GET_USER_FAIL_NO_USER',
    INFO_USED: 'UPDATED_USER_FAIL_SOCIALID_OR_EMAIL_USED',
    USER_EXIST: 'CREATE_USER_FAIL_USER_EXIST',
}

module.exports = USER_STATUS;