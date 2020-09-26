import * as React from 'react';
import { CalendarProps, Event } from 'react-big-calendar';
import './Calendar.css';
export interface CalendarEvent extends Event {
}
export interface Props extends Partial<CalendarProps> {
    events?: CalendarEvent[];
}
export interface State {
    hasError: boolean;
}
declare class Calendar extends React.PureComponent<Props, State> {
    calendarLocalizer: any;
    constructor(props: Props);
    static getDerivedStateFromError(error: any): {
        hasError: boolean;
    };
    render(): JSX.Element;
}
export default Calendar;
