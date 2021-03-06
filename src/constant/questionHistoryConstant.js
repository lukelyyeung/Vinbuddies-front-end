const QUESTION_HISTORY_STATUS = {
    //* successful status
    GET_HISTORY_SUCCESSFUL: 'GET_HISTORY_SUCCESSFUL',
    UPDATE_HISTORY_SUCCESSFUL: 'UPDATE_HISTORY_SUCCESSFUL',
    DELETE_HISTORY_SUCCESSFUL: 'DELETE_HISTORY_SUCCESSFUL',
    POST_HISTORY_SUCCESSFUL: 'POST_HISTORY_SUCCESSFUL',
    //* fail status
    INVALID_OPTION: 'POST_HISTORY_INVALID_OPTION',
    POST_HISTORY_FAIL: 'POST_HISTORY_FAIL',
    GET_HISTORY_FAIL: 'GET_HISTORY_FAIL_NO_HISTORY',
    DELETE_HISTORY_FAIL: 'DELETE_HISTORY_FAIL_NO_USER',
}

module.exports = QUESTION_HISTORY_STATUS;