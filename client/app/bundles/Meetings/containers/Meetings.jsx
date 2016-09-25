import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators.js';

import MeetingCard from '../components/MeetingCard';
import Header from './Header.jsx';
import Sidebar from '../components/Sidebar';
import SecretModal from '../components/SecretModal';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './Meetings.scss';


function mapStateToProps(state){
    var store = state.$$meetingsStore;

    return {
        meetings: store.get('$$meetings'),
        selectedMeeting: store.get('$$selectedMeeting'),
        secretModalToggled: store.get('$$secretModalToggled')
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

class Meetings extends React.Component {
  static propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    selectedMeeting: PropTypes.number
  };

  render() {
    var sidebar;
    var fullWidth=true;

    if (this.props.selectedMeeting !== null) {
      sidebar = (
          <div className={styles.sidebar}>
              <Sidebar {...this.props}/>
          </div>
      );
      fullWidth = false;
    } else {
      sidebar = null;
    }

    var meetings = this.props.meetings.map((meeting, index) => {
      return (<MeetingCard
                key={meeting.get('id')}
                {...meeting.toObject()}
                index={index}
                fullWidth={fullWidth}
                onMeetingClick={this.props.onMeetingClick}
          />);
    });

    return (
        <MuiThemeProvider>
            <div>
                <SecretModal {...this.props}/>
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
