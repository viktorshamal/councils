import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const $$initialState = Immutable.fromJS({
    $$meetings: [],
    $$meetingTemplates: [],
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
            const newMeetings = $$state.get('$$meetings').insert(0,Immutable.fromJS(action.meeting));
            return $$state.merge({
                $$meetings: Immutable.fromJS(newMeetings),
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
            const template = Immutable.fromJS(action.meetingTemplate.meeting_template);
            const newTemplates = $$state.get('$$meetingTemplates').insert(0,template);
            return $$state.merge({
                $$meetingTemplates: Immutable.fromJS(newTemplates),
                $$isFetching: false
            })
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
            return $$state.merge({
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