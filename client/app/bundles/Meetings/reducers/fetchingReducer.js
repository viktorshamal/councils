import { fromJS } from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const initialState = fromJS({
    calls: {},
    messages: []
});

export default function (state = initialState, action=null){
    if (!action.prefix || !action.name) return state;
    let name = action.name.toLowerCase();

    switch(action.type) {
        case `FETCH_${action.name}_START` :
        case `CREATE_${action.name}_START`:
            return startFetchingState(state, name, action.id);

        case `FETCH_${action.name}_SUCCESS` :
        case `CREATE_${action.name}_SUCCESS`:
            return endFetchingState(state, name, action.id);

        case `FETCH_${action.name}_ERROR` :
        case `CREATE_${action.name}_ERROR`:
            return endFetchingState(state, name, action.id);

        default: {
            return state;
        }
    }

}

function startFetchingState(state,name,id) {
    let oldCalls = state.get('calls');
    let oldIds = oldCalls.get(name);
    let newIds = [];
    if(oldIds) {
        newIds = oldIds.push(id);
    } else {
        newIds = [id];
    }
    let calls = oldCalls.set(name, fromJS(newIds));

    return state.merge({calls});
}

function endFetchingState(state,name,id) {
    let oldCalls = state.get('calls');
    let oldIds = oldCalls.get(name);
    let newIds = oldIds.filter(x => x != id);
    let calls = oldCalls.set(name, fromJS(newIds));
    let messages = state.get('messages').push(name + ' done');

    return state.merge({calls, messages});
}