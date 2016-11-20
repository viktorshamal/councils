import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class extends React.Component {
    state = {
        name:''
    };

    constructor(props){
        super(props);
    }

    handleSubmit() {
        this.props.handleSubmit({
            meeting_template: {
                name:this.state.name
            }
        });
        this.close();
    }

    close() {
        this.props.toggleModal('typeModal');
    }

    handleChange = (event) => {this.setState({name:event.target.value})};

    render() {
        const actions = [
            <FlatButton
                label="Anuller"
                primary={true}
                onClick={()=>this.close()}
                />,
            <FlatButton
                label="Gem"
                primary={true}
                onClick={()=>this.handleSubmit()}
                />
        ];

        return (
            <Dialog
                title="Tilføj en mødetype"
                actions={actions}
                open={this.props.open}
                modal={false}
                onRequestClose={()=>this.close()}
                autoScrollBodyContent={true}

                >
                <TextField hintText="Navn" onChange={this.handleChange}/>
            </Dialog>
        );
    }
}