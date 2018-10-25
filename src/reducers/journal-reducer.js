import {
    GET_JOURNAL_SUCCESS,
    GET_MORE_JOURNAL_SUCCESS,
    GET_JOURNAL_FAIL,
    TAB_JOURNAL,
    SET_SEARCH_CRITERIA
} from '../actions/journal-action';

const initialJournalState = {
    events: [],
    activeTab: 'creator',
    criteria: {
        limit: 2,
        orderby: 'date',
        search: {
            searchType: 'title',
            keyword: ''
        }
    }
};

export function journalReducer(state = initialJournalState, action) {
    switch (action.type) {
        case GET_JOURNAL_SUCCESS: {
            return {...state, events: action.journal};
        }
        case GET_MORE_JOURNAL_SUCCESS: {
            return {...state, events: state.events.concat(action.journal)};
        }
        case GET_JOURNAL_FAIL: {
            return state;
        }
        case TAB_JOURNAL: {
            return {...state, activeTab: action.activeTab};
        }
        case SET_SEARCH_CRITERIA: {
            const criteria = {...state.criteria, ...action.criteria};
            return {...state, criteria: criteria};
        }
        default: {
            return state;
        }
    }
}
