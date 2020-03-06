import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { SourceData } from './interface';
import { IconColor } from '../Icon';
declare type Themes = 'basic';
export interface Props {
    iconColor?: IconColor;
    selectedTheme?: Themes;
    source: SourceData[];
    theme?: any;
}
export interface State {
    source: SourceData[];
}
declare const _default: ThemedComponentClass<Props, State>;
export default _default;
