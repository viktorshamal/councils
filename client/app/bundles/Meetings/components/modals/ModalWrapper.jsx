import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

let styles = {
    dialog: {
        maxWidth:'600px',
        width: 'auto'
    }
};

export default (props) => {
    let close = () => {
        props.toggleModal(props.modalName);
    };

    let submit = () => {
        props.submitAction();
        close();
    };

    let submitButton = null;

    if(props.submitAction && props.submitLabel) {
        submitButton = (
            <RaisedButton
                label={props.submitLabel}
                primary={true}
                onClick={submit}
            />
        );
    }

    const actions = ([
        <FlatButton
            label="Luk"
            onClick={close}
        />,
        submitButton]
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