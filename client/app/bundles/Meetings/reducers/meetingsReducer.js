import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const $$initialState = Immutable.fromJS({
    $$meetings: [],
    $$meetingTemplates: [],
    $$message: '',
    $$users: {},
    $$roles: {},
    $$selectedMeeting: null,
    $$attendance: {},
    $$tokens: {},
    $$isFetching: false
});

export default function ($$state = $$initialState, action=null){
    switch(action.type) {
        case actionTypes.FETCH_ERROR: {
            throw new Error(action.error);
        }

        case actionTypes.SELECT_MEETING: {
            return $$state.merge({
                $$selectedMeeting: action.id
            });
        }

        case actionTypes.CREATE_MEETING: {
            return $$state.merge({
                $$isFetching: true
            });
        }
        case actionTypes.CREATE_MEETING_SUCCESS: {
            const newMeetings = $$state.get('$$meetings').insert(0,Immutable.fromJS(action.data.meeting));
            return $$state.merge({
                $$meetings: Immutable.fromJS(newMeetings),
                $$isFetching: false
            })
        }
        case actionTypes.CREATE_ROLE: {
            return $$state.merge({
                $$isFetching: true
            })
        }

        case actionTypes.CREATE_MEETING_TEMPLATE: {
            return $$state.merge({
                $$isFetching: true
            })
        }
        case actionTypes.CREATE_MEETING_TEMPLATE_SUCCESS: {
            const template = Immutable.fromJS(action.data.meeting_template);
            const newTemplates = $$state.get('$$meetingTemplates').insert(0,template);
            return $$state.merge({
                $$meetingTemplates: Immutable.fromJS(newTemplates),
                $$isFetching: false
            })
        }

        case actionTypes.FETCH_ROLES: {
            return $$state.merge({
                $$isFetching: true
            });
        }

        case actionTypes.FETCH_ROLES_SUCCESS: {
            let $$roles = $$state.get('$$roles');
            let { resource_id, user_ids} = action.data.role;
            let newRoles = $$roles.set(resource_id, user_ids);

            return $$state.merge({
                $$roles: newRoles,
                $$isFetching: false
            });
        }

        case actionTypes.FETCH_TOKEN: {
            return $$state.merge({
                $$isFetching: true
            });
        }

        case actionTypes.FETCH_TOKEN_SUCCESS: {
            let tokens = $$state.get('$$tokens');
            let newTokens = tokens.set(action.meeting_id,Immutable.fromJS(action.token));
            return $$state.merge({ $$tokens: newTokens });
        }

        case actionTypes.FETCH_USERS: {
            return $$state.merge({
                $$isFetching: true
            });
        }

        case actionTypes.FETCH_USERS_SUCCESS: {
            const $$users = {};
            action.data.users.map((user) => $$users[user.id] = user);
            return $$state.merge({
                $$users: Immutable.fromJS($$users),
                $$isFetching: false
            });
        }

        case actionTypes.FETCH_ATTENDANCE_SUCCESS: {
            const $$attendance = $$state.get('$$attendance');
            const newAttendance = $$attendance.merge(action.data.attendance);

            return $$state.merge({
                $$attendance: Immutable.fromJS(newAttendance),
                $$isFetching: false
            })
        }

        default:
            return $$state;
    }
};