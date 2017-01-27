import { fromJS } from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const initialState = fromJS({
    calls: {},
    messages: []
});

export default function (state = initialState, action=null){
    switch(action.type) {
        case `FETCH_${action.name}_START` :
        case `CREATE_${action.name}_START`:
            return newState(state, action.name, action.id, newIdsStart);

        case `FETCH_${action.name}_SUCCESS` :
        case `FETCH_${action.name}_ERROR` :
        case `CREATE_${action.name}_SUCCESS`:
        case `CREATE_${action.name}_ERROR`:
        case `DELETE_${action.name}_SUCCESS`:
        case `DELETE_${action.name}_ERROR`:
            return newState(state, action.name, action.id, newIdsEnd, action.message);

        case actionTypes.CLEAR_MESSAGE: {
            let messages = state.get('messages').delete(action.i);
            return state.merge({messages});
        }
        default: {
            return state;
        }
    }

}

function newIdsStart(oldIds, id){
    let newIds = oldIds ? oldIds.push(id) : [id];
    return fromJS(newIds);
}

function newIdsEnd(oldIds, id) {
    return fromJS(oldIds.filter(x => x != id));
}

function newState(state, name, id, newIds, message=null) {
    let oldCalls = state.get('calls');
    let oldIds = oldCalls.get(name.toLowerCase());

    let calls = oldCalls.set(name.toLowerCase(), newIds(oldIds, id));

    let newState = {calls};
    if(message) newState.messages = state.get('messages').push(message);
    return state.merge(newState);
}