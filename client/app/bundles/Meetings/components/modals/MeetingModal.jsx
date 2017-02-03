import React from 'react';
import ModalWrapper from './ModalWrapper.jsx';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TemplateSelector from './TemplateSelector.jsx';

import moment from 'moment';

export default class extends React.Component {
    constructor(props) {
        super(props);
        let id = null;
        if(this.props.meetingTemplates.has(0)) id = this.props.meetingTemplates.get(0).get('id');
        this.state = {
            meeting_template_id: id,
            date: Date.now(),
            time: Date.now()};
    }
    handleSubmit(){
        const { meeting_template_id, date, time } = this.state;
        this.props.handleSubmit({
            meeting:{
                meeting_template_id,
                date: mergeDates(date, time)
            }
        });
    }

    handleDateChange = (event,value) => this.setState({date:value});
    handleTimeChange = (event,value) => this.setState({time:value});
    handleSelectChange = (event, index, value) => this.setState({meeting_template_id: value});

    render() {
        return (
            <ModalWrapper
                modalName="meetingModal"
                title="Opret et møde"
                submitLabel="Opret møde"
                submitAction={()=>this.handleSubmit()}
                toggleModal={this.props.toggleModal}
                open={this.props.open}
                >
                <TemplateSelector
                    onSelectChange={this.handleSelectChange}
                    selected={this.state.meeting_template_id}
                    templates={this.props.meetingTemplates}
                    />
                <DatePicker hintText="Dato" onChange={this.handleDateChange} formatDate={formatDate}/>
                <TimePicker hintText="Klokkeslæt" format='24hr' onChange={this.handleTimeChange} />
            </ModalWrapper>
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