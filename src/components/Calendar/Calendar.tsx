import * as React from 'react';
import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
  Event,
} from 'react-big-calendar';
import * as moment from 'moment';
import './Calendar.css';

export interface CalendarEvent extends Event {}

export interface Props extends Partial<CalendarProps> {
  events?: CalendarEvent[];
}
export interface State {
  hasError: boolean;
}

class Calendar extends React.PureComponent<Props, State> {
  calendarLocalizer: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };

    this.calendarLocalizer = props.localizer || momentLocalizer(moment);
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    const { style = {}, events = [], ...rest } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <div>An unexpected error has occurred.</div>;
    }
    return (
      <BigCalendar
        style={{ height: 500, ...style }}
        events={events}
        localizer={this.calendarLocalizer}
        {...rest}
      />
    );
  }
}

export default Calendar;
