import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FloatingButton from '../components/ActionButton.jsx';

import * as actionCreators from '../actions/actionCreators.js';

function mapStateToProps(state){
    return {
        user: state.auth.get('user')
    }
}

function mapDispatchToProps(dispatch){
    return {
        onMeetingClick: (id) => {
            dispatch(actionCreators.selectMeeting(id));
        },
        onModalClick: () => {
            dispatch(actionCreators.toggleSecretModal());
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
            if(authorized) button = (<FloatingButton/>);
        }

        return (
            <div>
                {button}
            </div>
        );


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
