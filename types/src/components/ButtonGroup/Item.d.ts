import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as ButtonProps } from '../Button';
export interface Props {
    button: React.ReactElement<ButtonProps>;
    theme?: any;
}
export interface State {
    focused: boolean;
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
