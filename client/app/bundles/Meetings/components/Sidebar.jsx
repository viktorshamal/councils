import React, { PropTypes } from 'react';
import {selectMeeting} from '../actions/actionCreators.js'
import {Tabs, Tab} from 'material-ui/Tabs';

import styles from './Sidebar.scss';


export default class extends React.Component {
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.onMeetingClick(null);
    }

    render () {
        var meeting = this.props.meetings.get(this.props.selectedMeeting);

        return(
            <div className={styles.sidebar}>
                <Tabs tabItemContainerStyle={{backgroundColor:'transparent'}}>
                    <Tab label="Detaljer" style={{color:'black'}}>
                        <div className={styles.wrapper}>
                            <h2>Elevrådsmøde</h2>
                        </div>
                    </Tab>
                    <Tab label="Fremmødte" style={{color:'black'}}>
                        <div className={styles.wrapper}></div>
                    </Tab>
                </Tabs>

                <CloseButton close={this.close} />
            </div>
        );
    }
}

const CloseButton = ({close}) => {
    return (<span onClick={close}>X</span>);
};