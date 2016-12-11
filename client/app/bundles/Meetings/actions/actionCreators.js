import * as actionTypes from '../actions/actionTypes.js';
import { fetchResource, createResource, deleteResource } from './apiUtils.js';

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

export function clearMessage(i) {
    return {
        type: actionTypes.CLEAR_MESSAGE,
        i
    }
}

export function filterMeeting(id) {
    return {
        type: actionTypes.FILTER_MEETING,
        id
    }
}

export function fetchAttendance(meeting_id) {
    return (dispatch) => fetchResource('ATTENDANCE', '/attendances/' + meeting_id, {}, dispatch)
}

export function fetchToken(meeting_id) {
    return (dispatch) => fetchResource('TOKEN', '/tokens/' + meeting_id, {},
        dispatch, {meeting_id})
}

export function fetchRoles(meeting_template_id) {
    return (dispatch) => fetchResource('ROLES', '/roles/' + meeting_template_id, {},
        dispatch)
}

export function fetchUsers() {
    return (dispatch) => fetchResource('USERS', '/users', {}, dispatch)
}

export function createAttendance(id,code) {
    return (dispatch) => createResource('ATTENDANCE', '/meetings/' + id + '/attendances/', {code},
        dispatch, fetchAttendanceSuccess)
}

export function fetchAttendanceSuccess(attendance) {
    return {
        type: actionTypes.FETCH_ATTENDANCE_SUCCESS,
        data: attendance
    }
}

export function createMeeting(meeting) {
    return (dispatch) => createResource('MEETING','/meetings', meeting, dispatch)
}

export function createMeetingTemplate(meetingTemplate) {
    return (dispatch) => createResource('MEETING_TEMPLATE', '/meeting_templates', meetingTemplate, dispatch)
}

export function createRole(role) {
    return (dispatch) => createResource('ROLE', '/roles', role, dispatch)
}

export function deleteMeeting(id) {
    return (dispatch) => deleteResource('MEETING', '/meetings/' + id, dispatch)
}

export function deleteRole(id) {
    return (dispatch) => deleteResource('ROLE', '/roles/', dispatch)
}




