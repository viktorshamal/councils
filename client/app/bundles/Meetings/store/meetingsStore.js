import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'libs/middlewares/loggerMiddleware';

import reducers, { initialStates } from '../reducers';
import {configure, authStateReducer} from "redux-auth";

export default (props, railsContext) => {
    const initialMeetings = props.meetings;
    const initialTemplates = props.meeting_templates;
    const council = props.council;
    const { $$meetingsState, $$modalsState } = initialStates;
    const initialState = {
        $$meetingsStore: $$meetingsState.merge({
            $$meetings: initialMeetings,
            $$meetingTemplates: initialTemplates,
            $$council: council
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

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // Sync dispatched route actions to the history
    const finalCreateStore = composeEnhancers(
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )(createStore);


    return finalCreateStore(reducer, initialState);
};