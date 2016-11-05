import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

export default class extends React.Component {
    state = {
        type:'Yes',
        date: Date.now(),
        time: Date.now()
    };

    constructor(props){
        super(props);
    }

    close() {
        this.props.toggleModal('typeModal');
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={()=>this.close()}
                />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={()=>this.close()}
                />
        ];

        return (
            <Dialog
                title="Tilføj en mødetype"
                actions={actions}
                open={this.props.open}
                modal={false}
                onRequestClose={()=>this.close()}
                >
                The actions in this window were passed in as an array of React objects.
            </Dialog>
        );
    }
}