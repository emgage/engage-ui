import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { CAPTION } from '../ThemeIdentifiers';
import * as baseTheme from './Caption.scss';

export interface Props {
  // The content to display
  children?: React.ReactNode;
  // Set the style via css
  customStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
}

const caption = ({
  children,
  customStyle,
  theme,
}: Props) => {
  const className = classNames (
    theme.caption
  );

  return <p className={className} style={customStyle}>{children}</p>;
};

export { caption as UnthemedCaption };
export default themr(CAPTION, baseTheme)(caption) as ThemedComponentClass<Props, {}>;
