import * as React from 'react';
export interface SourceSet {
    source: string;
    descriptor?: string;
}
export interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    alt: string;
    source: string;
    sourceSet?: SourceSet[];
}
declare class Image extends React.PureComponent<Props, {}> {
    render(): JSX.Element;
}
export default Image;
