import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { IconColor, IconList } from '../Icon';
export declare type Status = 'success' | 'info' | 'attention' | 'warning' | 'new' | 'draft' | 'working' | 'published' | 'archive' | 'archived' | 'delete' | 'deleted' | 'locked';
export declare type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
export interface Props {
    children?: React.ReactNode;
    status?: Status;
    progress?: Progress;
    working?: boolean;
    icon?: boolean;
    iconSource?: keyof typeof IconList;
    iconColor?: IconColor;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
