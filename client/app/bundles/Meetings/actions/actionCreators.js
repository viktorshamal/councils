import * as actionTypes from '../actions/actionTypes.js';

export function selectMeeting(id) {
    return {
        type: actionTypes.SELECT_MEETING,
        id: id
    }
}

export function toggleSecretModal() {
    return {
        type: actionTypes.TOGGLE_SECRET_MODAL
    }
}

export function fetchUsers(meetingId) {
    return {
        type: actionTypes.FETCH_USERS,
        meetingId
    }
}