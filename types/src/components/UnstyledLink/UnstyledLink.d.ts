import * as React from 'react';
import { ReactComponent } from '@shopify/react-utilities/types';
export interface Props extends React.HTMLProps<HTMLAnchorElement> {
    url: string;
    external?: boolean;
    children?: React.ReactNode;
    [key: string]: any;
    componentStyle?: React.CSSProperties;
}
export declare type LinkLikeComponent = ReactComponent<Props>;
export default class UnstyledLink extends React.PureComponent<Props, never> {
    static use(newLinkComponent: LinkLikeComponent): void;
    render(): JSX.Element;
}
