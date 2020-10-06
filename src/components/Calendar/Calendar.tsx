import * as React from 'react';
import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
  Event,
} from 'react-big-calendar';
import * as moment from 'moment';
import './Calendar.css';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { CALENDAR } from '../ThemeIdentifiers';
import * as baseTheme from './Calendar.scss';
import Badge from '../Badge';

export interface CalendarEvent extends Event {}

export interface Props extends Partial<CalendarProps> {
  // Events to be shown in the calendar
  events?: CalendarEvent[];
  // Theme to be injected via css-themr
  theme?: any;
  showCreateIcon?: boolean;
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

  customDayPropGetter = (date: any) => {
    const { theme } = this.props;
    return {
      className: theme.calendarDay,
    };
  };

  ColoredDateCellWrapper = ({ children, value }: any) => {
    const { showCreateIcon, theme } = this.props;
    return React.cloneElement(React.Children.only(children), {
      children: showCreateIcon ? (
        <div className={theme.add_event}>
          <Badge status={'info'} icon iconSource={'add'}>
            Create New
          </Badge>
        </div>
      ) : null,
      ...children,
    });
  };

  render() {
    const { style = {}, events = [], theme, ...rest } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <div>An unexpected error has occurred.</div>;
    }
    return (
      <BigCalendar
        className={theme.engage_calendar}
        dayPropGetter={this.customDayPropGetter}
        style={{ height: 500, ...style }}
        events={events}
        localizer={this.calendarLocalizer}
        components={{
          dateCellWrapper: this.ColoredDateCellWrapper,
        }}
        {...rest}
      />
    );
  }
}

export { Calendar as UnthemedCalendar };
export default themr(CALENDAR, baseTheme)(Calendar) as ThemedComponentClass<
  Props,
  {}
>;
