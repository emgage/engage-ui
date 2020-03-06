import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as TextFieldProps } from '../TextField';
import { State as TextFieldState } from '../TextField/TextField';
export interface State extends TextFieldState {
    value?: string;
}
export interface Props extends TextFieldProps {
    [key: string]: any;
    mask?: string;
    formatChars?: any;
    maskChar?: string;
    defaultValue?: string;
    alwaysShowMask?: boolean;
    onPaste?(e: any): void;
    onKeyPress?(e: any): void;
    onKeyDown?(e: any): void;
    onEnter?(e: any): void;
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
