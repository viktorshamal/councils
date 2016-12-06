import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FloatingButton from '../components/ActionButton.jsx';
import MeetingModal from '../components/modals/MeetingModal.jsx';
import RoleModal from '../components/modals/RoleModal.jsx';
import TypeModal from '../components/modals/TypeModal.jsx';
import Snackbar from 'material-ui/Snackbar';

import * as actionCreators from '../actions/actionCreators.js';

function mapStateToProps(state){
    return {
        user: state.auth.get('user'),
        users: state.$$meetingsStore.get('$$users'),
        roles: state.$$meetingsStore.get('$$roles'),
        modals: state.$$modalsStore,
        meetingTemplates: state.$$meetingsStore.get('$$meetingTemplates'),
        messages: state.isFetching.get('messages')
    }
}

function mapDispatchToProps(dispatch){
    return {
        toggleModal: (modal) => {
            dispatch(actionCreators.toggleModal(modal));
        },
        createMeeting: (meeting) => {
            dispatch(actionCreators.createMeeting(meeting));
        },
        createMeetingTemplate: (meetingTemplate) => {
            dispatch(actionCreators.createMeetingTemplate(meetingTemplate));
        },
        fetchRoles: (meeting_template_id) => {
            dispatch(actionCreators.fetchRoles(meeting_template_id));
        },
        createRole: (role) => {
            dispatch(actionCreators.createRole(role));
        },
        fetchUsers: () => {
            dispatch(actionCreators.fetchUsers());
        }
    };
}

class ActionButton extends React.Component {
    static propTypes = {
        user: ImmutablePropTypes.map.isRequired
    };

    componentDidMount(){
        this.props.fetchUsers();
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
                    meetingTemplates={this.props.meetingTemplates}
                    />
                <TypeModal
                    open={this.props.modals.getIn(['typeModal','open'])}
                    toggleModal={this.props.toggleModal}
                    handleSubmit={this.props.createMeetingTemplate}
                    />
                <RoleModal
                    open={this.props.modals.getIn(['roleModal','open'])}
                    toggleModal={this.props.toggleModal}
                    meetingTemplates={this.props.meetingTemplates}
                    onChange={this.props.fetchRoles}
                    createRole={this.props.createRole}
                    users={this.props.users}
                    roles={this.props.roles}
                    />
                <Snackbar open={true} message={this.props.messages.last()} autoHideDuration={3000} />
            </div>
        );


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
