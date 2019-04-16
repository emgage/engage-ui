import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { CARD } from '../ThemeIdentifiers';
import * as baseTheme from './Card.scss';
import { classNames } from '@shopify/react-utilities/styles';

export interface Props {
  // Card footer related components to render inside this card footer.
  children?: React.ReactNode;
  // Custom style
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

const cardFooter = ({ children, theme, componentStyle, componentClass  }: Props) => {

  const footerClass = classNames(
        theme.footer,
        componentClass
      );

  return (
    <div style={componentStyle} className={footerClass}>
      {children}
    </div>
  );
};

export default themr(CARD, baseTheme)(cardFooter) as ThemedComponentClass<Props, {}>;
