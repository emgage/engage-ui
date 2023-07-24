import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import './ReactDatetime.css';
import * as moment from 'moment';
export declare type ViewMode = 'years' | 'months' | 'days' | 'time';
export interface Props {
    dateFormat?: boolean | string;
    defaultDateTime?: string;
    label: string;
    theme?: any;
    timePicker?: boolean;
    onChange(dataTime: any): void;
    onBlur?(dateTime: any): void;
    componentId?: string;
    unsetDefaultDateTime?: boolean;
    placeholder?: string;
    componentStyle?: React.CSSProperties;
    value?: string;
    getFromValue?: boolean;
    viewMode?: ViewMode;
    isValidDate?: (currentDate: any, selectedDate: any) => boolean;
    icon?: any;
    autoComplete?: boolean;
    iconColor?: string;
}
export interface State {
    dateTime: any;
    open: boolean;
}
declare class DateTimePicker extends React.PureComponent<Props, State> {
    private timeFormat;
    private dateTimeString;
    constructor(props: Props);
    static getDerivedStateFromProps(props: Props, state: State): {
        dateTime: moment.Moment;
    } | null;
    setDateTime: (dateTime: any) => void;
    onTextInputChange: (dateTimeString: string) => void;
    textFieldFocusHandler: () => void;
    render(): React.JSX.Element;
}
export { DateTimePicker as UnthemedDropdown };
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
