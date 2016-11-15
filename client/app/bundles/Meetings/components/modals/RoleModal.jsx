import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import TemplateSelector from './TemplateSelector.jsx';

export default class extends React.Component {
    state = {
        meeting_template_id: this.props.meetingTemplates.get(0).get('id')
    };

    constructor(props){
        super(props);
    }

    handleSelectChange = (e, i, meeting_template_id) => {
        this.setState({meeting_template_id});
        this.props.onChange(meeting_template_id);
    };

    close() {
        this.props.toggleModal('roleModal');
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
                title="Tilføj en rolle"
                actions={actions}
                open={this.props.open}
                modal={false}
                onRequestClose={()=>this.close()}
                >
                <TemplateSelector
                    onSelectChange={this.handleSelectChange}
                    selected={this.state.meeting_template_id}
                    templates={this.props.meetingTemplates}
                    />
                <RoleList
                    users={this.props.users}
                    roles={this.props.roles}
                    meeting_template_id={this.state.meeting_template_id}
                    />
            </Dialog>
        );
    }
}

const RoleList = ({users,roles,meeting_template_id}) => {
    var items;
    if(roles.has(meeting_template_id.toString())){
        items = roles.get(meeting_template_id.toString()).map((role)=>{
            let user_id = role.get('user_id').toString();
            let user = users.get(user_id);
            return (<ListItem primaryText={user.get('name')}/>);
        });
    }

    return (
        <List>
            {items}
        </List>
    );
};