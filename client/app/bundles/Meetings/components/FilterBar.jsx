import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import css from './FilterBar.scss';

let styles = {
    chip: {
        margin:'0.5rem 0.5rem 0 0',
        borderRadius:'0.1rem'
    },
    avatar:  {
        borderRadius:'0.1rem 0.1rem 0.1rem 0.1rem'
    }
};

export default class extends React.Component {
    state = {
        expanded: false
    };

    toggleExpanded = (expanded) => this.setState({expanded});
    filterMeeting = (id) => this.props.filterMeeting(id);


    render() {
        let collapsedSize = 4;
        let templates = this.state.expanded ? this.props.templates : this.props.templates.take(collapsedSize);

        let chips = templates.map((template) => {
            let avatarColor = (this.props.selectedTemplate === template.get('id') || this.props.selectedTemplate === null)
                ?  template.get('color')
                : 'grey';

            return (
                <Chip
                    style={styles.chip}
                    onTouchTap={()=>this.filterMeeting(template.get('id'))}>
                    <Avatar
                        style={styles.avatar}
                        size={32}
                        color='white'
                        backgroundColor={avatarColor}>
                        {template.get('name').charAt(0).toUpperCase()}
                    </Avatar>
                    {template.get('name')}
                </Chip>);
        });

        let toggleEnabled = templates.count() > (collapsedSize - 1);
        return (
            <div className={css.chips}>
                {chips}
                <ToggleChip enabled={toggleEnabled} expanded = {this.state.expanded} toggleExpanded={this.toggleExpanded} />
            </div>);
    }
}

const ToggleChip = ({enabled, expanded, toggleExpanded}) => {
    if(!enabled) return null;

    let text = expanded ? 'Vis færre' : 'Vis flere';
    return (<Chip onTouchTap={()=>toggleExpanded(!expanded)} style={styles.chip}>{text}</Chip>);
};