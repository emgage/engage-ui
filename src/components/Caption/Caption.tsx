import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { CAPTION } from '../ThemeIdentifiers';
import * as baseTheme from './Caption.scss';


export interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  theme?: any;
}

const caption = ({
  children,
  style,
  theme,
}: Props) => {
  const className = classNames (
    theme.caption
  );

  return <p className={className} style={style}>{children}</p>;
};

export { caption as UnthemedCaption };
export default themr(CAPTION, baseTheme)(caption) as ThemedComponentClass<Props, {}>;
