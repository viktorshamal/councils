import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const $$initialState = Immutable.fromJS({
    $$meetings: [],
    $$meetingTemplates: [],
    $$message: '',
    $$users: {},
    $$roles: {},
    $$selectedMeeting: null,
    $$secretModalToggled: false,
    $$attendants: {},
    $$isFetching: false
});

export default function ($$state = $$initialState, action=null){
    switch(action.type) {
        case actionTypes.SELECT_MEETING: {
            return $$state.merge({
                $$selectedMeeting: action.id
            });
        }
        case actionTypes.CREATE_MEETING: {
        return $$state.merge({
            $$isFetching: true
        })
    }
        case actionTypes.CREATE_MEETING_ERROR: {
            return $$state.merge({
                $$isFetching: false
            })
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
        case actionTypes.CREATE_ROLE_ERROR: {
            return $$state.merge({
                $$isFetching: false
            })
        }
        case actionTypes.CREATE_ROLE_SUCCESS: {
            let $$roles = $$state.get('$$roles');
            var newRoles = [];

            let {name, resource_id} = action.role;
            let role = { name, user_id };

            if($$roles.has(resource_id)) {
                newRoles = $$roles.get(resource_id);
            }
            newRoles.push(role);
            const $$newRoles = $$roles.set(resource_id,newRoles);
            console.log($$newRoles);

            return $$state.merge({
                $$roles: $$newRoles,
                $$isFetching: false
            })
        }

        case actionTypes.CREATE_MEETING_TEMPLATE: {
            return $$state.merge({
                $$isFetching: true
            })
        }
        case actionTypes.CREATE_MEETING_TEMPLATE_ERROR: {
            return $$state.merge({
                $$isFetching: false
            })
        }
        case actionTypes.CREATE_MEETING_TEMPLATE_SUCCESS: {
            const template = Immutable.fromJS(action.data.meetingTemplate.meeting_template);
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

        case actionTypes.FETCH_ROLES_ERROR: {
            return $$state.merge({
                $$isFetching: false
            });
        }
        case actionTypes.TOGGLE_SECRET_MODAL: {
            return $$state.merge({
                $$secretModalToggled: !$$state.get('$$secretModalToggled')
            });
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

        case actionTypes.FETCH_USERS_ERROR: {
            return $$state.merge({
                $$isFetching: false
            });
        }

        default:
            return $$state;
    }
};