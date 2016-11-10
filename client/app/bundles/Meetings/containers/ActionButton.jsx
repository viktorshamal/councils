import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FloatingButton from '../components/ActionButton.jsx';
import MeetingModal from '../components/modals/MeetingModal.jsx';
import RoleModal from '../components/modals/RoleModal.jsx';
import TypeModal from '../components/modals/TypeModal.jsx';

import * as actionCreators from '../actions/actionCreators.js';

function mapStateToProps(state){
    return {
        user: state.auth.get('user'),
        modals: state.$$modalsStore
    }
}

function mapDispatchToProps(dispatch){
    return {
        toggleModal: (modal) => {
            dispatch(actionCreators.toggleModal(modal));
        },
        createMeeting: (meeting) => {
            dispatch(actionCreators.createMeeting(meeting));
        }
    };
}

class ActionButton extends React.Component {
    static propTypes = {
        user: ImmutablePropTypes.map.isRequired
    };

    render () {
        const authorizedRoles = ['admin','moderator'];
        const attributes = this.props.user.get('attributes');
        var authorized = false;
        var button = null;

        if(attributes && attributes.has('role_names')) {
            authorized = attributes.get('role_names').some(function (role, i) {
                return authorizedRoles[i]==role;
            });
            if(authorized) button = (<FloatingButton toggleModal={this.props.toggleModal}/>);
        }

        return (
            <div>
                {button}
                <MeetingModal
                    open={this.props.modals.getIn(['meetingModal','open'])}
                    toggleModal={this.props.toggleModal}
                    handleSubmit={this.props.createMeeting}
                    />
                <TypeModal
                    open={this.props.modals.getIn(['typeModal','open'])}
                    toggleModal={this.props.toggleModal}
                    />
                <RoleModal
                    open={this.props.modals.getIn(['roleModal','open'])}
                    toggleModal={this.props.toggleModal}
                    />
            </div>
        );


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
