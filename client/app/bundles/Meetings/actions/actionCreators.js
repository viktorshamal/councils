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
    return (dispatch) => createResource('/meetings', meeting, dispatch, createMeetingSuccess, createMeetingError)
}

export function createMeetingTemplateSuccess(meetingTemplate) {
    return {
        type: actionTypes.CREATE_MEETING_TEMPLATE_SUCCESS,
        meetingTemplate
    }
}

export function createMeetingTemplateError(error) {
    return {
        type: actionTypes.CREATE_MEETING_TEMPLATE_ERROR,
        error
    }
}

export function createMeetingTemplate(meetingTemplate) {
    return (dispatch) => createResource('/meeting_templates', meetingTemplate,
        dispatch, createMeetingTemplateSuccess, createMeetingTemplateError)
}

function createResource(path,resource,dispatch,successAction,errorAction) {
    return fetch(getApiUrl() + path, {
        method: 'POST',
        body: JSON.stringify(resource),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => dispatch(successAction(data)))
    .catch(error => dispatch(errorAction(error)));
}