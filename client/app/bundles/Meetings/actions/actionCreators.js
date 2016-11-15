import * as actionTypes from '../actions/actionTypes.js';
import { fetchResource, createResource } from './apiUtils.js';

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

// Meetings
export function createMeetingOptimistic(meeting) {
    return {
        type: actionTypes.CREATE_MEETING,
        meeting
    }
}

export function createMeeting(meeting) {
    return (dispatch) => createResource('/meetings', meeting,
        dispatch, createMeetingSuccess, createMeetingError)
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


// Meeting Templates
export function createMeetingTemplate(meetingTemplate) {
    return (dispatch) => createResource('/meeting_templates', meetingTemplate,
        dispatch, createMeetingTemplateSuccess, createMeetingTemplateError)
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

// Roles

export function fetchRoles(meeting_template_id) {
    return (dispatch) => fetchResource('/roles', { meeting_template_id },
        dispatch, fetchRolesSuccess, fetchRolesError)
}

export function fetchRolesSuccess(roles) {
    return {
        type: actionTypes.FETCH_ROLES_SUCCESS,
        data: roles
    }
}

export function fetchRolesError(error) {
    return {
        type: actionTypes.FETCH_ROLES_ERROR,
        error
    }
}

// Users

export function fetchUsers() {
    return (dispatch) => fetchResource('/users', {},
        dispatch, fetchUsersSuccess, fetchUsersError)
}

export function fetchUsersSuccess(users) {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        data: users
    }
}

export function fetchUsersError(error) {
    return {
        type: actionTypes.FETCH_USERS_ERROR,
        error
    }
}

