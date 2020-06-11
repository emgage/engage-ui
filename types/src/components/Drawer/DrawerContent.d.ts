import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Mode } from './Drawer';
export interface Props {
    active?: boolean;
    closeButton?: boolean;
    flip?: boolean;
    componentId?: string;
    mode?: Mode;
    theme?: any;
    style?: any;
    fixedCloseButton?: boolean;
    toggleDrawer?(): void;
    children?: any;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
