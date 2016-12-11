import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TemplateSelector from './TemplateSelector.jsx';

import moment from 'moment';

export default class extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        meeting_template_id: this.props.meetingTemplates.get(0).get('id'),
        date: Date.now(),
        time: Date.now()
    };

    handleSubmit(){
        const { meeting_template_id, date, time } = this.state;
        this.props.handleSubmit({
            meeting:{
                meeting_template_id,
                date: mergeDates(date, time)
            }
        });
        this.close();
    }

    close() {
        this.props.toggleModal('meetingModal');
    }

    handleDateChange = (event,value) => this.setState({date:value});
    handleTimeChange = (event,value) => this.setState({time:value});
    handleSelectChange = (event, index, value) => this.setState({meeting_template_id: value});

    render() {
        const actions = [
            <RaisedButton
                label="Tilføj"
                primary={true}
                onClick={()=>this.handleSubmit()}
                />,
            <FlatButton
                label="Luk"
                primary={true}
                onClick={()=>this.close()}
                />
        ];

        return (
            <Dialog
                contentStyle={{overflowY:'auto'}}
                title="Tilføj et møde"
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
                <DatePicker hintText="Dato" onChange={this.handleDateChange} formatDate={formatDate}/>
                <TimePicker hintText="Klokkeslæt" format='24hr' onChange={this.handleTimeChange} />
            </Dialog>
        );
    }
}

const formatDate = (date) => {return moment(date).format('LL')};

const mergeDates = (date,time) => {
    date = new Date(date);
    time = new Date(time);
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        time.getUTCHours(),
        time.getUTCMinutes()
    ).getTime()/1000;
};