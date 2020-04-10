import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type Mode = 'slide' | 'push' | 'reveal';
declare const widthType: ("small" | "medium" | "large" | "collapsed")[];
export declare type Width = (typeof widthType)[number];
export interface Props {
    active?: boolean;
    accessibilityLabel?: string;
    activeContentId?: string | string[];
    closeButton?: boolean;
    fixedCloseButton?: boolean;
    componentLabel?: string;
    currentTheme?: string;
    themeClass?: string;
    flip?: boolean;
    mode?: Mode;
    onClose?(): void;
    onOpen?(): void;
    overlay?: boolean;
    componentWidth?: Width | string;
    zIndex?: number;
    theme?: any;
    toggleDrawer?(): void;
    componentStyle?: any;
    componentClass?: string;
    id?: string;
    master?: boolean;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
