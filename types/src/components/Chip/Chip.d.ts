import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { IconList } from '../Icon';
export interface Props {
    clickable?: boolean;
    removable?: boolean;
    image?: {
        url: string;
        alt?: string;
    };
    transparent?: boolean;
    theme?: any;
    onRemove?(event: React.FormEvent<HTMLElement>): void;
    onClick?(event: React.FormEvent<HTMLElement>): void;
    children?: string;
    icon?: keyof typeof IconList;
    onIconClick?(): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
