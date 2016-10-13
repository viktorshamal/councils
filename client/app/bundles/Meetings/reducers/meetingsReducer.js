import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const $$initialState = Immutable.fromJS({
    $$meetings: [],
    $$selectedMeeting: null,
    $$secretModalToggled: false,
    $$attendants: {},
    $$isFetching: false
});

export default function ($$state = $$initialState, action=null){
    switch(action.type) {
        case actionTypes.SELECT_MEETING: {
            return $$state.merge({
                $$selectedMeeting: action.id
            });
        }
        case actionTypes.TOGGLE_SECRET_MODAL: {
            return $$state.merge({
                $$secretModalToggled: !$$state.get('$$secretModalToggled')
            });
        }

        case actionTypes.FETCH_USERS: {
            return $$state.merge({
                $$isFetching: true
            });
        }

        case actionTypes.FETCH_USERS_SUCCESS: {
            return $$state.merge({
                $$isFetching: false
            });
        }

        case actionTypes.FETCH_USERS_ERROR: {
            return $$state.merge({
                $$isFetching: false
            });
        }

        default:
            return $$state;
    }
};