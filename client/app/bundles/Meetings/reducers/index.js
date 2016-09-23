import meetingsReducer, { $$initialState as $$meetingsState } from './meetingsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
    $$meetingsStore: meetingsReducer,
    railsContext: railsContextReducer
};

export const initialStates = {
    $$meetingsState,
    railsContextState
};