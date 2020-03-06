import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface ChoiceDescriptor {
    value: any;
    label: string;
}
export declare type Choice = ChoiceDescriptor;
export interface Props {
    componentTitle?: string;
    titleHidden?: boolean;
    choices: Choice[];
    selected: any[];
    componentName?: string;
    allowMultiple?: boolean;
    theme?: any;
    onChange?(selected: string[]): void;
    horizontal?: boolean;
    helpText?: string;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
