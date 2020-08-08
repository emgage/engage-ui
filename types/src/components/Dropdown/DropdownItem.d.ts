import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    content?: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    divider?: boolean;
    header?: boolean;
    onClick?(data: any): void;
    closeOnClickOption?: boolean;
    returnValue?: any;
    toggleDropdown?(): void;
    theme?: any;
}
declare class DropdownItem extends React.PureComponent<Props, never> {
    id: string;
    clickCallback: (event: any) => void;
    render(): JSX.Element;
}
export { DropdownItem as UnthemedSelect };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
