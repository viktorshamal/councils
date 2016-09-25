import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import styles from './SecretModal.scss';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
    }

    close (){
        this.props.onModalClick();
    }


    render () {
        var meeting = this.props.meetings.get(this.props.selectedMeeting);
        var actions = (<FlatButton onClick={this.close}>Luk</FlatButton>);
        return (
            <Dialog open={this.props.secretModalToggled} actions={actions} >
                <Content meeting={meeting} />
            </Dialog>
        );
    }
}

export const Content = ({meeting}) => {
    return (
        <div className={styles.content}>
            <h2>Tilmeldingskode</h2>
            <span>{meeting.get('secret')}</span>
        </div>
    );
};