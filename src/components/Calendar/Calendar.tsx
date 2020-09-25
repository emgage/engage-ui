import * as React from 'react';
import {
  Calendar as BigCalendar,
  CalendarProps,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar';
import * as moment from 'moment';
import './Calendar.scss';

export interface Props extends Partial<CalendarProps> {
  localizer?: DateLocalizer;
}
export interface State {}

class Calendar extends React.PureComponent<Props, State> {
  calendarLocalizer: any;

  constructor(props: Props) {
    super(props);
    this.calendarLocalizer = props.localizer || momentLocalizer(moment);
  }
  render() {
    const { style = {}, ...rest } = this.props;
    return (
      <BigCalendar
        style={{ height: 500, ...style }}
        events={[]}
        localizer={this.calendarLocalizer}
        {...rest}
      />
    );
  }
}

export default Calendar;
