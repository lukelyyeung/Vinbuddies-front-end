import { 
    GetJournalActions, 
    GET_JOURNAL_SUCCESS, 
    GET_MORE_JOURNAL_SUCCESS, 
    GET_JOURNAL_FAIL, 
    TAB_JOURNAL
} from '../actions/journal-action';
const initialJournalState = { events: [], activeTab: 'creator' };

export function eventReducer(state: any = initialJournalState, action: GetJournalActions) {
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
        default: {
            return state;
        }
    }
}