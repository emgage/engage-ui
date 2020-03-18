import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface NavigationState {
    indx: number;
    styles: string[];
}
export declare type ProcessStatus = 'active' | 'completed' | 'upcoming';
export interface Step {
    name: string;
    component?: React.ReactNode | string;
    style?: any;
    onClick?(): void;
    status?: string;
}
export interface Props {
    steps: Step[];
    showNavigation?: boolean;
    allowBackStepping?: boolean;
    theme?: any;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    onClick?(returnValue: number): void;
    onComponentStateUpdate?(currentComponentState: number, processComponentState: number): void;
    processComponentState?: number;
}
export interface State {
    showPreviousButton: boolean;
    showNextButton: boolean;
    processComponentState: number;
    navigationState: NavigationState;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
