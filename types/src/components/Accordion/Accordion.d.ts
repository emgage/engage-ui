import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Mode = 'collapsible' | 'multiple';
export interface AccordionItemProps {
    header: React.ReactElement<any>;
    children: React.ReactElement<any>;
    id?: any;
}
export interface Props {
    clickHandler?(event: React.FormEvent<HTMLElement>): void;
    childrenClickHandler?(event: React.FormEvent<HTMLElement>): void;
    closeIndex?: number;
    componentClass?: string;
    componentStyle?: any;
    items: AccordionItemProps[];
    mode?: Mode;
    openIndex?: number;
    defaultOpenIndexs?: number[] | 'all';
    theme?: any;
    position?: string;
    isDelete?: boolean;
    rotate?: any;
    icon?: string;
    onDeleteClick?: any;
    allOpen?: boolean;
    allClose?: boolean;
    key?: any;
}
interface State {
    active: boolean[];
}
declare class Accordion extends React.PureComponent<Props, State> {
    private getUniqueID;
    private id;
    constructor(props: Props);
    UNSAFE_componentWillReceiveProps(nextProps: Props): null | undefined;
    render(): React.JSX.Element;
    private toggleItem;
}
export { Accordion as UnthemedAccordion };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
