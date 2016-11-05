import meetingsReducer, { $$initialState as $$meetingsState } from './meetingsReducer';
import modalsReducer, {$$initialState as $$modalsState } from './modalsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
    $$meetingsStore: meetingsReducer,
    $$modalsStore: modalsReducer,
    railsContext: railsContextReducer
};

export const initialStates = {
    $$meetingsState,
    $$modalsState,
    railsContextState
};