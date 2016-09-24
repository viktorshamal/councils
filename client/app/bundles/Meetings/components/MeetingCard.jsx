import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import styles from './MeetingCard.scss'

import List from 'react-icons/lib/md/list';
import Subject from 'react-icons/lib/md/subject';
import Alarm from 'react-icons/lib/md/alarm';
import DateRange from 'react-icons/lib/md/date-range';
moment.locale('da');

// Simple example of a React "dumb" component
export default class extends React.Component {
  static propTypes = {
    secret: PropTypes.string.isRequired,
    agenda_drive_id: PropTypes.string.isRequired,
    summary_drive_id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onMeetingClick: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool.isRequired
  };

    constructor(props){
        super(props);
        this.selectMeeting = this.selectMeeting.bind(this);
    }

    selectMeeting() {
        this.props.onMeetingClick(this.props.index);
    }

  render() {
    var cardClass = this.props.fullWidth ? styles.fullWidth : styles.narrow;
    const {agenda_drive_id, summary_drive_id } = this.props;
    return (
        <div className={"container " + cardClass} style={{borderColor:this.props.color}}>
            <Header {...this.props} selectMeeting={this.selectMeeting} />
            <div className={styles.links}>
                <GoogleDriveLink id={agenda_drive_id}>
                    <List/> Dagsorden
                </GoogleDriveLink>
                <GoogleDriveLink id={summary_drive_id} >
                    <Subject />Referat
                </GoogleDriveLink>
            </div>
        </div>
    );
  }
}

const Header = ({date,name,selectMeeting}) => {
    return (
        <div className={styles.header}>
            <a onClick={selectMeeting}>
                <span className={styles.spanLink}></span>
            </a>

            <h2 className={styles.title}>{name}</h2>
            <Timestamp date={date}/>
        </div>
    );
};

const Timestamp = ({date}) => {
    return (
        <div className={styles.timestamp}>
            <span>
                {moment(date).format('LL')}
            </span>
            <span>
                {moment(date).format('LT')}
            </span>
        </div>
    );
};

const GoogleDriveLink = ({id, children}) => {
    return (
        <span className={styles.link}>
            <a href={"https://docs.google.com/document/d/" + id} target="_blank">
                {children}
            </a>
        </span>
    );
};
