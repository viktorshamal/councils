import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators.js';

import MeetingCard from '../components/MeetingCard';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar';
import ActionBar from '../components/ActionBar.jsx';
import ActionButton from './ActionButton.jsx';
import LinearProgress from 'material-ui/LinearProgress';

import moment from 'moment';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './Meetings.scss';

import { hasRole } from '../../../libs/utils.js';


function mapStateToProps(state){
    var store = state.$$meetingsStore;

    return {
        meetings: store.get('$$meetings'),
        meetingTemplates: store.get('$$meetingTemplates'),
        selectedMeeting: store.get('$$selectedMeeting'),
        selectedTemplate: store.get('selectedTemplate'),
        secretModalToggled: store.get('$$secretModalToggled'),
        user: state.auth.get('user'),
        users: store.get('$$users'),
        attendance: store.get('$$attendance'),
        tokens: store.get('$$tokens'),
        modals: state.$$modalsStore,
        isFetching: state.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return {
        onMeetingClick: (id) => {
            dispatch(actionCreators.selectMeeting(id));
        },
        fetchAttendance: (id) => {
            dispatch(actionCreators.fetchAttendance(id));
        },
        fetchToken: (id) => {
            dispatch(actionCreators.fetchToken(id));
        },
        toggleModal: (modal) => {
            dispatch(actionCreators.toggleModal(modal));
        },
        attendMeeting: (id,code) => {
            dispatch(actionCreators.createAttendance(id,code));
        },
        deleteMeeting: (id) => {
            dispatch(actionCreators.deleteMeeting(id));
        },
        filterMeeting: (id) => {
            dispatch(actionCreators.filterMeeting(id));
        }
    };
}

class Main extends React.Component {
  static propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    selectedMeeting: PropTypes.number
  };

  render() {
      let sidebarEnabled = (this.props.selectedMeeting !== null);
      let isAuthorized = hasRole(this.props.user,'admin');

      return (
        <MuiThemeProvider>
            <div>
                <Header user={this.props.user} />
                <ProgressBar isFetching={this.props.isFetching}/>
                <ActionBar {...this.props} optionsEnabled={isAuthorized}/>
                <div className={styles.main}>
                    <Meetings {...this.props} fullWidth={!sidebarEnabled}/>
                    <SidebarWrapper {...this.props} enabled={sidebarEnabled}/>
                </div>
                <ActionButton {...this.props} />
            </div>
        </MuiThemeProvider>
    );
  }
}

const SidebarWrapper = (props) => {
    let sidebar = null;
    let className = styles.sidebarHidden;

    if (props.enabled) {
        sidebar = (<Sidebar {...props}/>);
        className = styles.sidebarVisible;
    }

    return (
      <div className={className}>
        {sidebar}
      </div>
    );
};

const ProgressBar = ({isFetching}) => {
    let calls = isFetching.getIn(['calls','meeting']);
    if(calls && calls.count() > 0) return (
        <LinearProgress
            mode='indeterminate'
            className={styles.progress}
            style={{margin:'0 auto'}}
            />
    );
    return null;
};

const Meetings = ({meetings,selectedTemplate,onMeetingClick,fetchAttendance,fetchToken,fullWidth,selectedMeeting}) => {
    let items = meetings.filter((meeting)=>{
        return (selectedTemplate === meeting.get('meeting_template_id') || selectedTemplate === null);
    }).sort((meetingA,meetingB)=>{
        return moment(meetingB.get('date')).diff(meetingA.get('date'));
    }).map((meeting) => {
        return (<MeetingCard
            key={meeting.get('id')}
            {...meeting.toObject()}
            index={meetings.indexOf(meeting)}
            fullWidth={fullWidth}
            onMeetingClick={onMeetingClick}
            fetchAttendance={fetchAttendance}
            fetchToken={fetchToken}
            selectedMeeting={selectedMeeting}
            />);
    });

    return (<div className={styles.meetings}>{items}</div>);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
