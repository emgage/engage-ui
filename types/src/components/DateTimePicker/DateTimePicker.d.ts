import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import 'react-datetime/css/react-datetime.css';
export interface Props {
    dateFormat?: boolean | string;
    defaultDateTime?: string;
    label: string;
    theme?: any;
    timePicker?: boolean;
    onChange(dataTime: any): void;
    onBlur?(dateTime: any): void;
    componentId?: string;
}
export interface State {
    dateTime: any;
    open: boolean;
}
declare class DateTimePicker extends React.PureComponent<Props, State> {
    private timeFormat;
    private dateTimeString;
    constructor(props: Props);
    setDateTime: (dateTime: any) => void;
    onTextInputChange: (dateTimeString: string) => void;
    render(): JSX.Element;
}
export { DateTimePicker as UnthemedDropdown };
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
