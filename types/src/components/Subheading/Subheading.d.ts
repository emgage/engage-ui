import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { HeadingTagName } from '../../types';
export interface Props {
    element?: HeadingTagName;
    children?: React.ReactNode;
    theme?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
