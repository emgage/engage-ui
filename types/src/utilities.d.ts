import * as React from 'react';
export declare type ReactComponent<P> = React.StatelessComponent<P> | React.ComponentClass<P>;
export declare const firstChild: () => (props: {
    children?: React.ReactNode;
}) => {} | null;
export declare const getDisplayName: () => (COMPONENT: ReactComponent<any>) => string;
export declare function wrapWithComponent<P>(element: React.ReactNode | null | undefined, COMPONENT: ReactComponent<P>, props?: any): React.ReactNode;
export declare function isElementOfType(element: React.ReactNode | null | undefined, component: ReactComponent<{}> | ReactComponent<{}>[]): boolean;
export declare function calculateTipPosition(activatorRectXAxisCenter: number, left: number, preferredPosition?: any, preferredAlignment?: any): {
    marginLeft: number;
    marginTop: string;
    left?: undefined;
    top?: undefined;
    right?: undefined;
} | {
    marginLeft: number;
    marginTop?: undefined;
    left?: undefined;
    top?: undefined;
    right?: undefined;
} | {
    left: number;
    marginTop: string;
    marginLeft?: undefined;
    top?: undefined;
    right?: undefined;
} | {
    top: string;
    marginLeft?: undefined;
    marginTop?: undefined;
    left?: undefined;
    right?: undefined;
} | {
    top: string;
    right: string;
    marginLeft?: undefined;
    marginTop?: undefined;
    left?: undefined;
} | undefined;
