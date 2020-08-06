import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    children?: React.ReactNode;
    subdued?: boolean;
    theme?: any;
    onClick?(e: React.FormEvent<HTMLElement>): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
