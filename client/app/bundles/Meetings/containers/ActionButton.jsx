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

import {authorized} from '../../../libs/utils.js';

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
        },
        clearMessage: (i) => {
            dispatch(actionCreators.clearMessage(i));
        },
        deleteRole: (id) => {
            dispatch(actionCreators.deleteRole(id));
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
        let button = null;
        if(authorized(this.props.user)) button = (<FloatingButton toggleModal={this.props.toggleModal}/>);

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
                    deleteRole={this.props.deleteRole}
                    users={this.props.users}
                    roles={this.props.roles}
                    />
                <Notifications messages = {this.props.messages} clearMessage={this.props.clearMessage}/>
            </div>
        );


    }
}

class Notifications extends React.Component {
    static propTypes = {
        messages: PropTypes.array.isRequired
    };

    onRequestClose = (i) => this.props.clearMessage(i);

    render() {
        let i = this.props.messages.count() - 1;
        return (<Snackbar
            open={this.props.messages.count() > 0}
            message={this.props.messages.last()}
            autoHideDuration={3000}
            onRequestClose={()=>this.onRequestClose(i)}
            />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
