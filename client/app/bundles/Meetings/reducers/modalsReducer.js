import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes.js';

export const $$initialState = Immutable.fromJS({
    meetingModal: {open:false},
    typeModal: {open:false},
    roleModal: {open:false},
    attendModal: {open:false},
    secretModal: {open:false}
});

export default function ($$state = $$initialState, action=null) {
    switch(action.type){
        case actionTypes.TOGGLE_MODAL: {
            const isOpen = $$state.getIn([action.modal, 'open']);
            return $$state.merge({
                [action.modal]: { open: !isOpen }
            });
        }

        default: {
            return $$state;
        }
    }
}