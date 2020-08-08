import * as React from 'react';

export interface SourceSet {
  source: string;
  descriptor?: string;
}

export interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  // To render text or image when particular image can not be displayed or not available.
  alt: string;
  // Souce for an image.
  source: string;
  sourceSet?: SourceSet[];
}

class Image extends React.PureComponent<Props, {}> {
  render() {
    const { sourceSet, source, ...rest } = this.props;
    const finalSourceSet = sourceSet
      ? (
        sourceSet
          .map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`)
          .join(',')
      )
      : null;

    return finalSourceSet
      ? <img src={source} srcSet={finalSourceSet} {...rest} />
      : <img src={source} {...rest} />;
  }
}

export default Image;
