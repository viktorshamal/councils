import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'libs/middlewares/loggerMiddleware';

import reducers, { initialStates } from '../reducers';
import {configure, authStateReducer} from "redux-auth";

export default (props, railsContext) => {
    const initialMeetings = props;
    const { $$meetingsState, $$modalsState } = initialStates;
    const initialState = {
        $$meetingsStore: $$meetingsState.merge({
            $$meetings: initialMeetings
        }),
        $$modalsStore: $$modalsState,
        railsContext
    };

    // https://github.com/reactjs/react-router-redux
    const reducer = combineReducers({
        ...reducers,
        routing: routerReducer,
        auth: authStateReducer
    });

    // Sync dispatched route actions to the history
    const finalCreateStore = compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )(createStore);

    return finalCreateStore(reducer, initialState);
};