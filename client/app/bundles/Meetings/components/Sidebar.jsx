import React, { PropTypes } from 'react';
import {selectMeeting} from '../actions/actionCreators.js'
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import SecretModal from '../components/SecretModal';
import AttendModal from '../components/modals/AttendModal';


import FlatButton from 'material-ui/FlatButton';

import styles from './Sidebar.scss';


export default class Sidebar extends React.Component {
    render () {
        let meeting = this.props.meetings.get(this.props.selectedMeeting);
        let token = this.props.tokens.get(meeting.get('id'));

        return(
            <div className={styles.sidebar}>
                <SecretModal
                    token={token}
                    meeting_id={meeting.get('id')}
                    fetchToken={this.props.fetchToken}
                    open={this.props.modals.getIn(['secretModal','open'])}
                    toggleModal={this.props.toggleModal}
                />
                <AttendModal
                    open={this.props.modals.getIn(['attendModal','open'])}
                    toggleModal={this.props.toggleModal}
                    handleSubmit={this.props.attendMeeting}
                    meeting_id={meeting.get('id')}

                    />
                <Tabs tabItemContainerStyle={{backgroundColor:'transparent'}}>
                    <Tab label="Detaljer" style={{color:'black'}}>
                        <div className={styles.wrapper}>
                            <h2>{meeting.get('name')}</h2>
                            <FlatButton onClick={()=>this.props.toggleModal('secretModal')}>
                                Vis tilmeldingskode
                            </FlatButton>
                            <FlatButton onClick={()=>this.props.toggleModal('attendModal')}>
                                Tilmeld
                            </FlatButton>
                        </div>
                    </Tab>
                    <Tab label="Fremmødte" style={{color:'black'}}>
                        <div className={styles.wrapper}>
                            <AttendanceList
                                users={this.props.users}
                                meeting_id={meeting.get('id')}
                                attendance={this.props.attendance}
                                />
                        </div>
                    </Tab>
                </Tabs>
                <FlatButton
                    style={{position:'absolute', bottom:'0.5rem', right:'0.5rem'}}
                    onClick={()=>this.props.onMeetingClick(null)}
                >
                    Luk
                </FlatButton>
            </div>
        );
    }
}

Sidebar.propTypes = {
    selectedMeeting: PropTypes.number
};

const AttendanceList = ({users,meeting_id,attendance}) => {
    var items = null;
    var meetingAttendance = attendance.get(meeting_id.toString());
    if(meetingAttendance){
        items = meetingAttendance.map((id)=>{
            let user = users.get(id.toString());
            if(!user) return null;
            return (
                <ListItem
                    primaryText={user.get('name')}
                    leftAvatar={<Avatar >V</Avatar>}
                    key={id}
                    />
            );
        });
    }

    return (
        <List>
            {items}
        </List>
    );
};