import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as ChipStates } from '../Chip';
export interface State {
    active: boolean;
    anchorEl?: HTMLElement;
}
export interface Props {
    chip: React.ReactElement<ChipStates>;
    componentStyle?: React.CSSProperties;
    theme?: any;
    onClick?(): void;
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
