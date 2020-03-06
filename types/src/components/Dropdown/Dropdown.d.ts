import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as DropdownItemProps } from './DropdownItem';
import { PreferredPosition } from '../PositionedOverlay';
import { PreferredAlignment } from '../PositionedOverlay/math';
export interface Props {
    disabled?: boolean;
    preferredPosition?: PreferredPosition;
    anchorEl?: any;
    closeOnClickOutside?: any;
    closeOnClickOption?: boolean;
    dropdownItems: DropdownItemProps[];
    returnValue?: any;
    preferredAlignment?: PreferredAlignment;
    toggle?(event?: any): void;
    onClose?(): void;
    onOpen?(): void;
    theme?: any;
}
export interface State {
    selectedIndex: number;
    active: boolean;
    manualInActive: boolean;
}
export declare class Dropdown extends React.PureComponent<Props, State> {
    constructor(props: Props);
    setDropdownState: () => void;
    innerToggleDropdown: () => void;
    render(): JSX.Element;
}
export { Dropdown as UnthemedDropdown };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
