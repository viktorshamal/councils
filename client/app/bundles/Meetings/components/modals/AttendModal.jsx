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
        this.close();
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
                label="Luk"
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
                <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                    <h2>Indtast tilmeldingskoden</h2>
                    <TextField
                        onChange={this.handleChange}
                        inputStyle={{fontSize:'26px', textAlign:'center'}} />
                    <RaisedButton
                        style={{marginTop:'1rem'}}
                        label="Tilmeld"
                        primary={true}
                        onClick={()=>this.handleSubmit()} />
                </div>
            </Dialog>
        );
    }
}