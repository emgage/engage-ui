import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import * as DateTime from 'react-datetime';
import { Icon, TextField } from '../index';
import './ReactDatetime.css';
import * as moment from 'moment';
import { DATETIMEPICKER } from '../ThemeIdentifiers';
import * as baseTheme from './DateTimePicker.scss';

export interface Props {
  /*
  Defines the format for the date. It accepts any moment.js date format.
  If true the date will be displayed using the defaults for the current locale.
  If false the datepicker is disabled and the component can be used as timepicker.
  */
  dateFormat?: boolean | string;
  // set default Date time
  defaultDateTime?: string;
  // label for dateTime picker input
  label: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // enable time in picker
  timePicker?: boolean;
  // return on Change
  onChange(dataTime: any): void;
  // return date time
  onBlur?(dateTime: any): void;
  // Component Id for validation form
  componentId?: string;
  // Unset Default date Time
  unsetDefaultDateTime?: boolean;
  // Hint text to display.
  placeholder?: string;
  // To provide styling.
  componentStyle?: React.CSSProperties;
  // To set value
  value?: string;
  // allow you to take value from only value prop
  getFromValue?: boolean;
}

export interface State {
  // startDate
  dateTime: any;
  // focus
  open: boolean;
}

class DateTimePicker extends React.PureComponent<Props, State>{
  // set time format for Date picker base on timePicker props
  private timeFormat = this.props.timePicker && this.props.dateFormat ? 'MM/DD/YYYY [at] h:mm A' : this.props.timePicker ? 'h:mm A' : 'MM/DD/YYYY';
  // set dateTime for moment string
  private dateTimeString = moment().format(this.timeFormat);

  constructor(props: Props) {
    super(props);
    this.state = {
      dateTime: props.unsetDefaultDateTime ? '' : props.defaultDateTime ? moment(props.defaultDateTime) : moment(),
      open: false
    };
    document.addEventListener('click', (e) => {
      const html = e.target as any;
      if (html.nodeName.toString() === 'DIV') {
        this.setState({ open: false });
      }
    });
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.unsetDefaultDateTime !== true && props.defaultDateTime) {
      return {
        dateTime: moment(props.defaultDateTime),
      };
    }
    return null;
  }

  setDateTime = (dateTime: any) => {
    this.setState({ dateTime });
    this.props.onChange(dateTime);
  }

  onTextInputChange = (dateTimeString: string)  => {
    this.dateTimeString = dateTimeString;
    const dateTimeArray = this.dateTimeString.split(' ');
    dateTimeArray.splice(1, 1);
    dateTimeArray.splice(dateTimeArray.length - 1, 1);
    const newDate = moment(dateTimeArray.join(' '));
    this.setState({ dateTime: newDate.isValid() ? newDate : this.state.dateTime });
  }
  textFieldFocusHandler = () => {
    const divs: any = document.getElementsByClassName('rdt');
    if (divs.length) {
      for (const element of divs) {
        element.classList.remove('rdtOpen');
      }
      // @ts-ignore
      document.getElementById(document.activeElement.id).parentElement.parentElement.nextElementSibling.classList.add('rdtOpen');
      this.setState({ open: true });
    }
  }

  render() {
    const { dateFormat, label, theme, timePicker, placeholder, componentStyle, value, getFromValue, componentId } = this.props;
    const { dateTime, open } = this.state;
    let dateTimeValue;
    if (getFromValue) {
      dateTimeValue = value ? moment(value).format(this.timeFormat) : '';
    } else {
      dateTimeValue = dateTime ? dateTime.format(this.timeFormat) : null;
    }
    return (
        <div>
            <TextField
                type="text"
                label={label}
                value={dateTimeValue}
                onFocus={this.textFieldFocusHandler}
                onChange={(dateTimeString: string) => { this.onTextInputChange(dateTimeString); }}
                suffix={<Icon source="event" />}
                placeholder={placeholder}
                componentStyle={componentStyle}
                componentId={componentId}
            />
            <DateTime
                value={value ? value : dateTime}
                onBlur={() => { this.setState({ open: false }); }}
                open={open}
                closeOnSelect
                className={theme.dateTimeInput}
                onChange={(dateTime: any) => { this.setDateTime(dateTime); }}
                timeFormat={timePicker}
                dateFormat={dateFormat}
            />
        </div>
    );
  }
}

export { DateTimePicker as UnthemedDropdown };
export default themr(DATETIMEPICKER, baseTheme)(DateTimePicker) as ThemedComponentClass<Props, State>;
