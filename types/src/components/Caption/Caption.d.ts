import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export interface Props {
    children?: React.ReactNode;
    componentStyle?: React.CSSProperties;
    theme?: any;
}
declare const caption: ({ children, componentStyle, theme, }: Props) => JSX.Element;
export { caption as UnthemedCaption };
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
