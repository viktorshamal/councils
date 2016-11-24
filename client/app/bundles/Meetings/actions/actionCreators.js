import * as actionTypes from '../actions/actionTypes.js';
import { fetchResource, createResource } from './apiUtils.js';

export function fetchAttendance(meeting_id) {
    return (dispatch) => fetchResource('/attendances/' + meeting_id, {},
        dispatch, fetchAttendanceSuccess, fetchError)
}

export function selectMeeting(id) {
    return {
        type: actionTypes.SELECT_MEETING,
        id
    }
}

export function fetchAttendanceSuccess(attendance) {
    return {
        type: actionTypes.FETCH_ATTENDANCE_SUCCESS,
        data: attendance
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
        dispatch, createMeetingSuccess, fetchError)
}

export function createMeetingSuccess(meeting) {
    return {
        type: actionTypes.CREATE_MEETING_SUCCESS,
        data: meeting
    }
}

// Meeting Templates
export function createMeetingTemplate(meetingTemplate) {
    return (dispatch) => createResource('/meeting_templates', meetingTemplate,
        dispatch, createMeetingTemplateSuccess, fetchError)
}

export function createMeetingTemplateSuccess(meetingTemplate) {
    return {
        type: actionTypes.CREATE_MEETING_TEMPLATE_SUCCESS,
        data: meetingTemplate
    }
}

// Roles

export function fetchRoles(meeting_template_id) {
    return (dispatch) => fetchResource('/roles/' + meeting_template_id, {},
        dispatch, fetchRolesSuccess, fetchError)
}

export function fetchRolesSuccess(roles) {
    return {
        type: actionTypes.FETCH_ROLES_SUCCESS,
        data: roles
    }
}

export function createRole(role) {
    return (dispatch) => createResource('/roles', role,
        dispatch, fetchRolesSuccess, fetchError)
}

// Users

export function fetchUsers() {
    return (dispatch) => fetchResource('/users', {},
        dispatch, fetchUsersSuccess, fetchError)
}

export function fetchUsersSuccess(users) {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        data: users
    }
}

export function fetchError(error) {
    return {
        type: actionTypes.FETCH_ERROR,
        error
    }
}

