import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators.js';

import MeetingCard from '../components/MeetingCard';
import styles from './Meetings.scss';

import Header from './Header.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Sidebar from '../components/Sidebar';


function mapStateToProps(state){
    var store = state.$$meetingsStore;

    return {
        meetings: store.get('$$meetings'),
        selectedMeeting: store.get('$$selectedMeeting')
    }
}

function mapDispatchToProps(dispatch){
    return {
        onMeetingClick: (id) => {
            dispatch(actionCreators.selectMeeting(id));
        }
    };
}

class Meetings extends React.Component {
  static propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    selectedMeeting: PropTypes.number
  };

  render() {
    var meetings = this.props.meetings.map((meeting, index) => {
      return (<MeetingCard
                key={meeting.get('id')}
                {...meeting.toObject()}
                index={index}
                onMeetingClick={this.props.onMeetingClick}
          />);
    });

    var sidebar;
    if (this.props.selectedMeeting !== null) {
        sidebar = (
            <div className={styles.sidebar}>
                <Sidebar {...this.props}/>
            </div>
        );
    } else {
        sidebar = null;
    }

    return (
        <MuiThemeProvider>
            <div>
                <Header />
                <div className={styles.main}>
                  <div className={styles.meetings}>
                    {meetings}
                  </div>
                  {sidebar}
                </div>
            </div>
        </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
