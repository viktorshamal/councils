import React from 'react';
import ModalWrapper from './ModalWrapper.jsx';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TemplateSelector from './TemplateSelector.jsx';
import RemoveIcon from 'react-icons/lib/md/remove-circle-outline.js';


import style from './RoleModal.scss';

let styles = {
    list: {
        maxHeight:'20rem',
        overflowY:'auto'
    }
};

export default class extends React.Component {
    state = {
        meeting_template_id: this.props.meetingTemplates.get(0).get('id'),
        user_id: null
    };

    componentWillMount() {
        this.props.onChange(this.state.meeting_template_id);
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

    render() {
        return (
            <ModalWrapper
                modalName={'roleModal'}
                title="Torvholdere"
                open={this.props.open}
                toggleModal={this.props.toggleModal}
                >
                <p>Når man er torvholder kan man oprette møder og redigere mødedokumenterne.</p>
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
                    onChange={this.handleUserChange}
                    handleSubmit={this.handleSubmit}/>
            </ModalWrapper>
        );
    }
}

const RoleAdder = ({users,selected,onChange,handleSubmit}) => {
    const items = users.valueSeq().map((user)=>{
        return (<MenuItem
            primaryText={user.get('name')}
            key={user.get('id')}
            value={user.get('id')} />)
    });
    return (
        <div className={style.roleAdder}>
            <SelectField
                floatingLabelText='Ny torvholder'
                floatingLabelFixed={true}
                value={selected}
                onChange={onChange}
                >
                {items}
            </SelectField>
            <RaisedButton
                style={{marginLeft:'0.5rem'}}
                label="Tilføj"
                primary={true}
                disabled={!selected}
                onClick={handleSubmit}
                />
        </div>
    );
};

const RoleList = ({users,roles,meeting_template_id}) => {
    let items;
    if(roles.has(meeting_template_id)){
        items = roles.get(meeting_template_id).map((role)=>{
            const user_id = role.user_id;
            const user = users.get(user_id.toString());
            return (<ListItem
                key={user_id}
                primaryText={user.get('name')}
            />);
        });
    }

    return (
        <List style={styles.list}>
            {items}
        </List>
    );
};