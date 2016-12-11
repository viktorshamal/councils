import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class extends React.Component {
    state = {
        code:''
    };

    constructor(props){
        super(props);
    }

    handleSubmit() {
        this.props.handleSubmit(this.props.meeting_id, this.state.code);
    }

    close() {
        this.props.toggleModal('attendModal');
    }

    handleChange = (event) => {
        this.setState({code:event.target.value});
    };

    render() {
        const actions = [
            <FlatButton
                label="Anuller"
                primary={true}
                onClick={()=>this.close()}
                />
        ];

        return (
            <Dialog
                actions={actions}
                open={this.props.open}
                modal={false}
                onRequestClose={()=>this.close()}

                >
                <TextField hintText="••••" onChange={this.handleChange}/>
                <FlatButton
                    label="Tilmeld"
                    primary={true}
                    onClick={()=>this.handleSubmit()}
                    />
            </Dialog>
        );
    }
}