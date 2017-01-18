import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import Face from 'material-ui/svg-icons/action/face';
import Group from 'material-ui/svg-icons/social/group-add';

import styles from './ActionBar.scss';

let mdStyles = {
    chip: {
        margin:'0.5rem 0.5rem 0 0',
        borderRadius:'0.1rem'
    },
    avatar:  {
        borderRadius:'0.1rem 0.1rem 0.1rem 0.1rem',
        minWidth: '32px'
    }
};


export default (props) => {
    let actions = (props.optionsEnabled) ? (<Actions toggleModal={props.toggleModal} />) : null;

    return (
        <div className={styles.actionBar}>
            <FilterBar
                templates={props.meetingTemplates}
                filterMeeting={props.filterMeeting}
                selectedTemplate={props.selectedTemplate} />
            {actions}
        </div>
    );
};

const Actions = ({toggleModal}) => {
  return (
      <div className={styles.options}>
          <IconButton tooltip="Vis torvholdere" touch={true} tooltipPosition="bottom-center" onClick={()=>toggleModal('roleModal')}>
              <Face />
          </IconButton>
          <IconButton tooltip="Nyt udvalg" touch={true} tooltipPosition="bottom-center" onClick={()=>toggleModal('typeModal')}>
              <Group />
          </IconButton>
      </div>
  );
};

class FilterBar extends React.Component {
    state = {
        expanded: false
    };

    toggleExpanded = (expanded) => this.setState({expanded});
    filterMeeting = (id) => this.props.filterMeeting(id);


    render() {
        let collapsedSize = 6;
        let templates = this.state.expanded ? this.props.templates : this.props.templates.take(collapsedSize);

        let chips = templates.map((template) => {
            let avatarColor = (this.props.selectedTemplate === template.get('id') || this.props.selectedTemplate === null)
                ?  template.get('color')
                : 'grey';

            return (
                <Chip
                    style={mdStyles.chip}
                    onTouchTap={()=>this.filterMeeting(template.get('id'))}>
                    <Avatar
                        style={mdStyles.avatar}
                        size={32}
                        color='white'
                        backgroundColor={avatarColor}>
                        {template.get('name').charAt(0).toUpperCase()}
                    </Avatar>
                    {template.get('name')}
                </Chip>);
        });

        let toggleEnabled = templates.count() > (collapsedSize-1);
        return (
            <div className={styles.chips}>
                {chips}
                <ToggleChip enabled={toggleEnabled} expanded = {this.state.expanded} toggleExpanded={this.toggleExpanded} />
            </div>);
    }
}

const ToggleChip = ({enabled, expanded, toggleExpanded}) => {
    if(!enabled) return null;

    let text = expanded ? 'Vis færre' : 'Vis flere';
    return (<Chip onTouchTap={()=>toggleExpanded(!expanded)} style={mdStyles.chip}>{text}</Chip>);
};