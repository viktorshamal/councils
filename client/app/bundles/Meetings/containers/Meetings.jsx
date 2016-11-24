import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators.js';

import MeetingCard from '../components/MeetingCard';
import Header from './Header.jsx';
import ActionButton from './ActionButton.jsx';
import Sidebar from '../components/Sidebar';
import SecretModal from '../components/SecretModal';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './Meetings.scss';
import sidebarStyles from '../components/Sidebar.scss';

import { CSSGrid, measureItems, makeResponsive } from 'react-stonecutter';

function mapStateToProps(state){
    var store = state.$$meetingsStore;

    return {
        meetings: store.get('$$meetings'),
        selectedMeeting: store.get('$$selectedMeeting'),
        secretModalToggled: store.get('$$secretModalToggled'),
        user: state.auth.get('user'),
        users: store.get('$$users'),
        attendance: store.get('$$attendance')
    }
}

function mapDispatchToProps(dispatch){
    return {
        onMeetingClick: (id) => {
            dispatch(actionCreators.selectMeeting(id));
        },
        onModalClick: () => {
            dispatch(actionCreators.toggleSecretModal());
        },
        fetchAttendance: (id) => {
            dispatch(actionCreators.fetchAttendance(id));
        }
    };
}

class Meetings extends React.Component {
  static propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    selectedMeeting: PropTypes.number
  };

  render() {
    var sidebar;

    if (this.props.selectedMeeting !== null) {
      sidebar = (<Sidebar {...this.props}/>);
    } else {
      sidebar = null;
    }

    var meetings = this.props.meetings.map((meeting, index) => {
      return (<MeetingCard
                key={meeting.get('id')}
                {...meeting.toObject()}
                index={index}
                fullWidth={!sidebar}
                onMeetingClick={this.props.onMeetingClick}
                fetchAttendance={this.props.fetchAttendance}
          />);
    });

    return (
        <MuiThemeProvider>
            <div>
                <SecretModal {...this.props}/>
                <Header user={this.props.user} />
                <div className={styles.main}>
                    <div className={styles.meetings}>
                        {meetings}
                    </div>
                    <div className={sidebar ? styles.sidebarVisible : styles.sidebarHidden}>
                        {sidebar}
                    </div>
                </div>
                <ActionButton {...this.props}/>
            </div>
        </MuiThemeProvider>
    );
  }
}

const Grid = makeResponsive(measureItems(CSSGrid), {
    maxWidth: 1920,
    minPadding: 100
});

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
