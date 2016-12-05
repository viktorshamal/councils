import { fromJS } from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const initialState = fromJS({
    isFetching: {}
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
    let oldFetching = state.get('isFetching');
    let oldIds = oldFetching.get(name);
    let newIds = [];
    if(oldIds) {
        newIds = oldIds.push(id);
    } else {
        newIds = [id];
    }

    return state.merge({isFetching: oldFetching.set(name, fromJS(newIds))});
}

function endFetchingState(state,name,id) {
    let oldFetching = state.get('isFetching');
    let oldIds = oldFetching.get(name);
    let newIds = oldIds.filter(x => x != id);

    return state.merge({isFetching: oldFetching.set(name, fromJS(newIds))});
}