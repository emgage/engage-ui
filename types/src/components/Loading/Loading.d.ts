import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { IconColor, IconList } from '../Icon';
export interface Props {
    componentStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    iconClass?: string;
    iconSource?: keyof typeof IconList;
    iconColor?: IconColor;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
