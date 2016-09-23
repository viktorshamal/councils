import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import styles from './MeetingCard.scss'
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
    onMeetingClick: PropTypes.func.isRequired
  };

    constructor(props){
        super(props);
        this.selectMeeting = this.selectMeeting.bind(this);
    }

    selectMeeting() {
        this.props.onMeetingClick(this.props.index);
    }

  render() {
    const {agenda_drive_id, summary_drive_id } = this.props;
    return (
        <div className={"container " + styles.card}>
            <Header {...this.props} selectMeeting={this.selectMeeting} />
            <ul>
                <GoogleDriveLink id={agenda_drive_id} name="Dagsorden" />
                <GoogleDriveLink id={summary_drive_id} name="Referat" />
            </ul>
        </div>
    );
  }
}

const Header = ({date, selectMeeting}) => {
    return (
        <div className={styles.header}>
            <a onClick={selectMeeting}>
                <span className={styles.spanLink}></span>
            </a>

            <h2>Elevrådsmøde</h2>
            <Timestamp date={date}/>
        </div>
    );
};

const Timestamp = ({date}) => {
    return (
        <div className={styles.timestamp}>
            <p>{moment(date).format('LL')}</p>
            <p>{moment(date).format('LT')}</p>
        </div>
    );
};

const GoogleDriveLink = ({id, name}) => {
    return (
        <li>
            <a href={"https://docs.google.com/document/d/" + id} target="_blank">
                <span className={styles.spanLink}></span>
                {name}
            </a>
        </li>
    );
};
