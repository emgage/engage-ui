import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Action } from '../Labelled';
export interface Props {
    label?: string;
    componentStyle?: any;
    componentClass?: string;
    segmented?: boolean;
    children?: React.ReactNode;
    componentId?: string;
    theme?: any;
    labelAction?: Action;
    helpText?: React.ReactNode;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
