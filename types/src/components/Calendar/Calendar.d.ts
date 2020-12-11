import * as React from 'react';
import { CalendarProps, Event } from 'react-big-calendar';
import './Calendar.css';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface CalendarEvent extends Event {
}
export interface Props extends Partial<CalendarProps> {
    events?: CalendarEvent[];
    theme?: any;
    showCreateIcon?: boolean;
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
    customDayPropGetter: (date: any) => {
        className: any;
    };
    withCreateEventDateCellWrapper: ({ children, value }: any) => React.DetailedReactHTMLElement<any, HTMLElement>;
    render(): JSX.Element;
}
export { Calendar as UnthemedCalendar };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
