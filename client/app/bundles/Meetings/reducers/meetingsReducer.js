import { fromJS } from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const $$initialState = fromJS({
    $$selectedMeeting: null,
    selectedTemplate: null,
    $$meetings: [],
    $$meetingTemplates: [],
    $$users: {},
    $$roles: {},
    $$attendance: {},
    $$tokens: {}
});

export default function (state = $$initialState, action=null){
    switch(action.type) {
        case actionTypes.SELECT_MEETING: {
            return state.merge({
                $$selectedMeeting: action.id
            });
        }

        case actionTypes.FILTER_MEETING: {
            let oldSelected = state.get('selectedTemplate');
            let selectedTemplate = oldSelected === action.id ? null : action.id;
            return state.merge({selectedTemplate});
        }

        case actionTypes.CREATE_MEETING_SUCCESS: {
            let oldMeetings = state.get('$$meetings');
            let $$meetings = fromJS(oldMeetings.insert(0,fromJS(action.data.meeting)));

            return state.merge({ $$meetings });
        }

        case actionTypes.CREATE_MEETING_TEMPLATE_SUCCESS: {
            const template = fromJS(action.data.meeting_template);
            const $$meetingTemplates = fromJS(state.get('$$meetingTemplates').insert(0,template));

            return state.merge({ $$meetingTemplates });
        }

        case actionTypes.CREATE_ATTENDANCE_SUCCESS: {
            const oldAttendance = state.get('$$attendance');
            const $$attendance = fromJS(oldAttendance.merge(action.data.attendance));

            return state.merge({ $$attendance });
        }

        case actionTypes.FETCH_ROLES_SUCCESS: {
            let oldRoles = state.get('$$roles');
            let { resource_id, user_ids} = action.data.role;
            let $$roles = oldRoles.set(resource_id, user_ids);

            return state.merge({ $$roles });
        }

        case actionTypes.FETCH_TOKEN_SUCCESS: {
            let oldTokens = state.get('$$tokens');
            let $$tokens = oldTokens.set(action.meeting_id,fromJS(action.data.token));

            return state.merge({ $$tokens });
        }

        case actionTypes.FETCH_USERS_SUCCESS: {
            const $$users = {};
            action.data.users.map((user) => $$users[user.id] = user);

            return state.merge({$$users: fromJS($$users)});
        }

        case actionTypes.FETCH_ATTENDANCE_SUCCESS: {
            const oldAttendance = state.get('$$attendance');
            const $$attendance = fromJS(oldAttendance.merge(action.data.attendance));

            return state.merge({ $$attendance });
        }

        default:
            return state;
    }
};