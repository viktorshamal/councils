import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


let styles = {
    dialog: {
        maxWidth:'600px',
        width: 'auto'
    }
};

export default (props) => {
    close = () => {
        props.toggleModal(props.modalName);
    };

    const actions = ([
        props.submitButton,
        <FlatButton
            label="Luk"
            onClick={close}
        />]
    );

    return(
        <Dialog
            contentStyle={{overflowY:'auto'}}
            modal={false}
            onRequestClose={close}
            contentStyle={styles.dialog}
            autoDetectWindowHeight={false}
            actions={actions}
            autoScrollBodyContent={true}
            {...props}>
        {props.children}
        </Dialog>
    );
}