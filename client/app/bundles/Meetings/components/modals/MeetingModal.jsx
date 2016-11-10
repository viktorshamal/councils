import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

export default class extends React.Component {
    state = {
        meeting_template_id: '26',
        date: Date.now(),
        time: Date.now()
    };

    constructor(props){
        super(props);
    }

    handleSubmit(){
        const { meeting_template_id, date, time } = this.state;
        this.props.handleSubmit({
            meeting_template_id: meeting_template_id,
            date: mergeDates(date, time)
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
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={()=>this.close()}
                />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={()=>this.handleSubmit()}
                />
        ];

        return (
            <Dialog
                title="Tilføj et møde"
                actions={actions}
                open={this.props.open}
                modal={true}
                onRequestClose={()=>this.close()}
                >
                <Forms
                    handleDateChange={this.handleDateChange}
                    handleTimeChange={this.handleTimeChange}
                    handleSelectChange={this.handleSelectChange}
                    selected={this.state.meeting_template_id}
                    />
            </Dialog>
        );
    }
}

const Forms = ({handleDateChange,handleTimeChange,handleSelectChange,selected}) => {
  return (
      <div>
          <SelectField
              floatingLabelText="Mødetype"
              value={selected}
              onChange={handleSelectChange}
              >
              <MenuItem value={26} primaryText="Elevrådsmøde" />
              <MenuItem value={27} primaryText="Bestyrelsesmøde" />
              <MenuItem value={1}  primaryText="Elevrådsmøde" />
          </SelectField>
          <DatePicker hintText='Dato' onChange={handleDateChange} formatDate={formatDate}/>
          <TimePicker hintText='Klokkeslæt' format='24hr' onChange={handleTimeChange} />
      </div>
  );
};

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