import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Action } from '../../types';
export { Action };
export interface Props {
    children?: any;
    componentId: string;
    action?: Action;
    hidden?: boolean;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    theme?: any;
    required?: boolean;
    focused?: boolean;
    hasValue?: boolean;
}
export declare function labelID(id: string): string;
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
