import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TemplateSelector from './TemplateSelector.jsx';
import RemoveIcon from 'react-icons/lib/md/remove-circle-outline.js';

export default class extends React.Component {
    state = {
        meeting_template_id: this.props.meetingTemplates.get(0).get('id'),
        user_id: null
    };

    constructor(props){
        super(props);
    }

    handleSubmit = () => {
        const {user_id, meeting_template_id} = this.state;
        this.props.createRole({
            role: {
                user_id,
                meeting_template_id
            }
        })
    };

    handleSelectChange = (e, i, meeting_template_id) => {
        this.setState({meeting_template_id});
        this.props.onChange(meeting_template_id);
    };

    handleUserChange = (e,i,value) => {this.setState({user_id:value})};

    close() {
        this.props.toggleModal('roleModal');
    }

    render() {
        const actions = [
            <FlatButton
                label="Luk"
                primary={true}
                onClick={()=>this.close()}
                />
        ];

        return (
            <Dialog
                contentStyle={{overflowY:'auto'}}
                title="Tilføj en rolle"
                actions={actions}
                open={this.props.open}
                modal={false}
                onRequestClose={()=>this.close()}
                //autoScrollBodyContent={true}

                >
                <TemplateSelector
                    onSelectChange={this.handleSelectChange}
                    selected={this.state.meeting_template_id}
                    templates={this.props.meetingTemplates} />
                <br />
                <RoleList
                    users={this.props.users}
                    roles={this.props.roles}
                    meeting_template_id={this.state.meeting_template_id} />
                <RoleAdder
                    users={this.props.users}
                    selected={this.state.user_id}
                    onChange={this.handleUserChange} />
                <RaisedButton
                    style={{marginLeft:'0.5rem'}}
                    label="Tilføj"
                    primary={true}
                    disabled={!this.state.user_id}
                    onClick={this.handleSubmit}
                    />,
            </Dialog>
        );
    }
}

const RoleAdder = ({users,selected,onChange}) => {
    const items = users.valueSeq().map((user)=>{
        return (<MenuItem
            primaryText={user.get('name')}
            key={user.get('id')}
            value={user.get('id')} />)
    });
    return (
        <SelectField
            floatingLabelText='Person'
            floatingLabelFixed={true}
            value={selected}
            onChange={onChange}
            >
            {items}
        </SelectField>
    );
};

const RoleList = ({users,roles,meeting_template_id}) => {
    var items;
    if(roles.has(meeting_template_id)){
        items = roles.get(meeting_template_id).map((role)=>{
            const user_id = role.user_id;
            const user = users.get(user_id.toString());
            return (<ListItem
                key={user_id}
                primaryText={user.get('name')}
                //rightIcon={<RemoveIcon />}
            />);
        });
    }

    return (
        <List>
            {items}
        </List>
    );
};