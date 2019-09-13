import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import * as DateTime from 'react-datetime';
import { Icon, TextField } from '../index';
import 'react-datetime/css/react-datetime.css';
import * as moment from 'moment';
import { DATETIMEPICKER } from '../ThemeIdentifiers';
import * as baseTheme from './DateTimePicker.scss';


export interface Props {
  // label for dateTime picker input
  label: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // enable time in picker
  timePicker?: boolean;
  // return date time
  onBlur(dateTime: string): void;
}

export interface State {
  // startDate
  dateTime: any;
  // focus
  open: boolean;
}

class DateTimePicker extends React.Component<Props,State>{
  // set time format for Date picker base on timePicker props
  private timeFormat = this.props.timePicker ? 'MM/DD/YYYY [at] h:mm A' :  'MM/DD/YYYY';
  // set dateTime for moment string
  private dateTimeString = moment().format(this.timeFormat);

  constructor(props: Props) {
    super(props);
    this.state = {
      dateTime: moment(),
      open: false
    };
  }

  setDateTime = (dateTime: any) => {
    this.setState({ dateTime });
  }

  onTextInputChange = (dateTimeString: string)  => {
    this.dateTimeString = dateTimeString;
  }

  onTextInputBlur = () => {
    const dateTimeArray = this.dateTimeString.split(' ');
    dateTimeArray.splice(1,1);
    dateTimeArray.splice(dateTimeArray.length - 1, 1);
    const newDate = moment(dateTimeArray.join(' '));
    this.setState({ dateTime: newDate.isValid() ? newDate : this.state.dateTime }, () => {
      if (newDate.isValid()) {
        this.props.onBlur(this.dateTimeString);
      }
    });
  }

  render() {
    const { label, theme, timePicker } = this.props;
    const { dateTime, open } = this.state;
    return (
        <div>
            <TextField
                label={label}
                value={dateTime.format(this.timeFormat)}
                onFocus={() => { this.setState({ open: true }); }}
                onBlur={this.onTextInputBlur}
                onChange={(dateTimeString: string) => { this.onTextInputChange(dateTimeString); }}
                suffix={<Icon source="event" />}
            />
            <DateTime
                value={dateTime}
                onBlur={() => { this.setState({ open: false }); }}
                open={open}
                closeOnSelect
                className={theme.dateTimeInput}
                onChange={(dateTime: any) => { this.setDateTime(dateTime); }}
                timeFormat={timePicker}
            />
        </div>
    );
  }
}

export { DateTimePicker as UnthemedDropdown };
export default themr(DATETIMEPICKER, baseTheme)(DateTimePicker) as ThemedComponentClass<Props, State>;
