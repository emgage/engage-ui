import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
export declare type CrossOrigin = 'anonymous' | 'use-credentials';
export declare type Preload = 'none' | 'metadata' | 'auto';
export declare enum VideoType {
    WebM = 0,
    MP4 = 1,
    Ogg = 2
}
export interface VideoSource {
    src: string;
    type: VideoType;
}
export interface Props {
    poster: URL;
    src: VideoSource[];
    autoplay?: boolean;
    controls?: boolean;
    crossorigin?: CrossOrigin;
    loop?: boolean;
    muted?: boolean;
    preload?: Preload;
    theme?: any;
    componentStyle?: React.CSSProperties;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
