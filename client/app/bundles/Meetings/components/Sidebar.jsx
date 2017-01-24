import React, { PropTypes } from 'react';
import {selectMeeting} from '../actions/actionCreators.js'
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import SecretModal from '../components/SecretModal';
import AttendModal from '../components/modals/AttendModal';
import TextField from 'material-ui/TextField';

import AlarmIcon from 'react-icons/lib/md/alarm';
import DateIcon from 'react-icons/lib/md/date-range';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import styles from './Sidebar.scss';

import {authorized} from '../../../libs/utils.js';

import moment from 'moment';

export default class Sidebar extends React.Component {
    render () {
        let meeting = this.props.meetings.get(this.props.selectedMeeting);
        let token = this.props.tokens.get(meeting.get('id'));
        let date = meeting.get('date');

        let deleteForm, secretModal = null;
        if(authorized(this.props.user)) {
            //deleteForm = (<DeleteForm deleteMeeting={this.props.deleteMeeting} id={meeting.get('id')}/>);
            secretModal = (<RaisedButton
                style={{marginLeft:'0.5rem'}}
                label="Kode"
                onClick={()=>this.props.toggleModal('secretModal')} />);
        }

        return(
            <div className={styles.sidebar} >
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
                            <AlarmIcon /> {moment(date).format('LT')}
                            <br/>
                            <DateIcon />{moment(date).format('LL')}
                            <br/>
                            <div className={styles.driveButtons}>
                                <a href={"https://docs.google.com/document/d/" + meeting.get('agenda_drive_id')} target='_blank'>
                                    <FlatButton label='Dagsorden' />
                                </a>
                                <a href={"https://docs.google.com/document/d/" + meeting.get('summary_drive_id')} target='_blank'>
                                    <FlatButton label='Referat' />
                                </a>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Fremmødte" style={{color:'black'}}>
                        <div>
                            <AttendanceList
                                users={this.props.users}
                                meeting_id={meeting.get('id')}
                                attendance={this.props.attendance}
                                />
                        </div>
                    </Tab>
                </Tabs>
                <div style={{position:'absolute', bottom:'0.5rem',width:'100%'}}>
                    <RaisedButton
                        style={{marginLeft:'1rem'}}
                        primary={true}
                        label="Tilmeld"
                        onClick={()=>this.props.toggleModal('attendModal')} />
                    {secretModal}
                    <FlatButton
                        label="Luk"
                        style={{position:'absolute', right:'0.5rem'}}
                        onClick={()=>this.props.onMeetingClick(null)} />
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    selectedMeeting: PropTypes.number
};

class DeleteForm extends React.Component {
    state = {
        deleting: false,
        input: ''
    };

    handleChange = (event) => this.setState({input:event.target.value});
    toggle = (deleting) => this.setState({deleting});

    deleteMeeting = (id) => {
        this.props.deleteMeeting(id);
        this.setState({deleting:false});
    };

    render () {
        let disabled = this.state.input !== 'SLET';
        let content = null;
        if(this.state.deleting){
            content = [
                    <TextField
                        style={{width:'4rem',marginRight:'1rem'}}
                        hintText="SLET"
                        onChange={this.handleChange} />,
                    <RaisedButton
                        label="Slet"
                        secondary={true}
                        onClick={()=>this.props.deleteMeeting(this.props.id)}
                        disabled={disabled} />,
                    <FlatButton
                        label="Annuller"
                        onClick={()=>this.toggle(false)}
                        />]
        } else {
            content = (<RaisedButton
                    label="Slet"
                    secondary={true}
                    onClick={()=>this.toggle(true)}/>
            );
        }

        return (
            <div className={styles.deleteForm}>
                {content}
            </div>
        );


    }
}

const AttendanceList = ({users,meeting_id,attendance}) => {
    var items = null;
    var meetingAttendance = attendance.get(meeting_id.toString());
    if(meetingAttendance){
        items = meetingAttendance.map((id)=>{
            let user = users.get(id.toString());
            if(!user) return null;
            let name = user.get('name');
            let avatar = (<Avatar >{name.charAt(0)}</Avatar>);
            return (
                <ListItem
                    primaryText={name}
                    leftAvatar={avatar}
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
