import React, { PropTypes } from 'react';
import {selectMeeting} from '../actions/actionCreators.js'
import {Tabs, Tab} from 'material-ui/Tabs';

import FlatButton from 'material-ui/FlatButton';

import styles from './Sidebar.scss';


export default class extends React.Component {
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    close() {
        this.props.onMeetingClick(null);
    }

    toggleModal(){
        this.props.onModalClick();
    }

    render () {
        var meeting = this.props.meetings.get(this.props.selectedMeeting);

        return(
            <div className={styles.sidebar}>
                <Tabs tabItemContainerStyle={{backgroundColor:'transparent'}}>
                    <Tab label="Detaljer" style={{color:'black'}}>
                        <div className={styles.wrapper}>
                            <h2>{meeting.get('name')}</h2>
                            <FlatButton onClick={this.toggleModal}>
                                Vis tilmeldingskode
                            </FlatButton>
                        </div>
                    </Tab>
                    <Tab label="Fremmødte" style={{color:'black'}}>
                        <div className={styles.wrapper}></div>
                    </Tab>
                </Tabs>
                <FlatButton
                    style={{position:'absolute', bottom:'0.5rem', right:'0.5rem'}}
                    onClick={this.close}
                >
                    Luk
                </FlatButton>
            </div>
        );
    }
}