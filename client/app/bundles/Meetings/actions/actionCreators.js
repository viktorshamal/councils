import * as actionTypes from '../actions/actionTypes.js';

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

export function createMeeting(meeting) {
    return function(dispatch) {
        dispatch(createMeetingOptimistic(meeting));

        setTimeout(()=>{
            console.log('hello');
        },1000);

        return null;
    }
}