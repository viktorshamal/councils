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
import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {blue300, indigo900} from 'material-ui/styles/colors';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './Meetings.scss';
import sidebarStyles from '../components/Sidebar.scss';

import { CSSGrid, measureItems, makeResponsive } from 'react-stonecutter';

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

class Meetings extends React.Component {
  static propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    selectedMeeting: PropTypes.number
  };

  render() {
    let sidebar;

    if (this.props.selectedMeeting !== null) {
      sidebar = (<Sidebar {...this.props}/>);
    } else {
      sidebar = null;
    }

    let progress = null;
    let calls = this.props.isFetching.getIn(['calls','meeting']);
    if(calls && calls.count() > 0) progress = (
        <LinearProgress
            mode='indeterminate'
            className={styles.progress}
            style={{margin:'0 auto'}}
        />
    );

    var meetings = this.props.meetings.filter((meeting)=>{
        return (this.props.selectedTemplate === meeting.get('meeting_template_id') || this.props.selectedTemplate === null);
    }).map((meeting, index) => {
      return (<MeetingCard
                key={meeting.get('id')}
                {...meeting.toObject()}
                index={index}
                fullWidth={!sidebar}
                onMeetingClick={this.props.onMeetingClick}
                fetchAttendance={this.props.fetchAttendance}
                fetchToken={this.props.fetchToken}
          />);
    });

    return (
        <MuiThemeProvider>
            <div>
                <Header user={this.props.user} />
                {progress}
                <div className={styles.actionBar}>
                    <Chips
                        templates={this.props.meetingTemplates}
                        filterMeeting={this.props.filterMeeting}
                        selectedTemplate={this.props.selectedTemplate} />
                </div>
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



class Chips extends React.Component {
    state = {
        expanded: false
    };

    toggleExpanded = (expanded) => this.setState({expanded});
    filterMeeting = (id) => this.props.filterMeeting(id);


    render() {
        let collapsedSize = 4;
        let templates = this.state.expanded ? this.props.templates : this.props.templates.take(collapsedSize);
        let chipStyle = {
            margin:'0.5rem 0.5rem 0 0',
            borderRadius:'0.1rem'
        };

        let chips = templates.map((template)=>{
            let avatarColor =
                (this.props.selectedTemplate === template.get('id') || this.props.selectedTemplate === null)
                ?  template.get('color')
                : 'grey';
           return (
           <Chip
               style={chipStyle}
               onTouchTap={()=>this.filterMeeting(template.get('id'))}>
               <Avatar
                   style={{borderRadius:'0.1rem 0.1rem 0.1rem 0.1rem'}}
                   size={32}
                   color='white'
                   backgroundColor={avatarColor}>
                   B
               </Avatar>
               {template.get('name')}
           </Chip>);
        });

        let toggleChip = null;
        if(this.state.expanded) {
            toggleChip = (<Chip onTouchTap={()=>this.toggleExpanded(false)} style={chipStyle}>Vis færre</Chip>);
        } else {
            toggleChip = (<Chip onTouchTap={()=>this.toggleExpanded(true)} style={chipStyle}>Vis flere</Chip>);
        }

        let finalChips = templates.count() > (collapsedSize - 1) ? chips.push(toggleChip) : chips;

        return (<div className={styles.chips}>{finalChips}</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
