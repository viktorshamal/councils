import * as actionTypes from '../actions/actionTypes.js';

export function selectMeeting(id) {
    return {
        type: actionTypes.SELECT_MEETING,
        id: id
    }
}