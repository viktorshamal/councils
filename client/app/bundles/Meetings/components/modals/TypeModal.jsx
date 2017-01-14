import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {CirclePicker} from 'react-color';

export default class extends React.Component {
    state = {
        name:'',
        color:''
    };

    constructor(props){
        super(props);
    }

    handleSubmit() {
        this.props.handleSubmit({
            meeting_template: {
                name:this.state.name,
                color:this.state.color
            }
        });
        this.close();
    }

    close() {
        this.props.toggleModal('typeModal');
    }

    handleChange = (event) => {this.setState({name:event.target.value})};
    handleColorChange = (color,event) => {this.setState({color:color.hex})};

    render() {
        const actions = [
            <RaisedButton
                label="Tilføj"
                primary={true}
                onClick={()=>this.handleSubmit()} />,
            <FlatButton
                label="Luk"
                onClick={()=>this.close()}
                />
        ];

        let colors = ['#43B5AD','#48ACF0','#B74F6F','#1C77C3','#F39237','#F9C80E'];
        let contentStyle= {
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        };
        return (
            <Dialog
                contentStyle={{overflowY:'auto'}}
                title="Udvalg"
                actions={actions}
                open={this.props.open}
                modal={false}
                onRequestClose={()=>this.close()}
                contentStyle={contentStyle}
                >
                <TextField hintText="Navn" onChange={this.handleChange}/>
                <CirclePicker
                    color={this.state.color}
                    colors={colors}
                    onChangeComplete={this.handleColorChange} />
            </Dialog>
        );
    }
}