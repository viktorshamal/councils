import meetingsReducer, { $$initialState as $$meetingsState } from './meetingsReducer';
import modalsReducer, { $$initialState as $$modalsState } from './modalsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';
import fetchingReducer, { initialState as fetchingState } from './fetchingReducer.js';

export default {
    $$meetingsStore: meetingsReducer,
    $$modalsStore: modalsReducer,
    isFetching: fetchingReducer,
    railsContext: railsContextReducer
};

export const initialStates = {
    $$meetingsState,
    $$modalsState,
    fetchingState,
    railsContextState
};