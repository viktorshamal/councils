import * as actionTypes from '../actions/actionTypes.js';
import { fetch, getApiUrl } from 'redux-auth';

export function selectMeeting(id) {
    return {
        type: actionTypes.SELECT_MEETING,
        id
    }
}

export function toggleModal(modal){
    return {
        type: actionTypes.TOGGLE_MODAL,
        modal
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

export function createMeetingOptimistic(meeting) {
    return {
        type: actionTypes.CREATE_MEETING,
        meeting
    }
}

export function createMeetingSuccess(meeting) {
    return {
        type: actionTypes.CREATE_MEETING_SUCCESS,
        meeting
    }
}
export function createMeetingError(error) {
    return {
        type: actionTypes.CREATE_MEETING_ERROR,
        error
    }
}

export function createMeeting(meeting) {
    return function(dispatch) {
        dispatch(createMeetingOptimistic(meeting));

        return fetch(getApiUrl() + '/meetings', {
            method: 'POST',
            body: JSON.stringify({meeting}),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => dispatch(createMeetingSuccess(data.meeting)))
        .catch(error => dispatch(createMeetingError(error)));
    }
}