import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { CARD } from '../ThemeIdentifiers';

import * as baseTheme from './Card.scss';

export interface Props {
  // Card section related components to render inside this card section.
  children?: React.ReactNode;
  // A less prominent card section
  subdued?: boolean;
  // Theme to be injected via css-themr.
  theme?: any;
}

const CardSection = ({ children, subdued, theme }: Props) => {

  const className = classNames(
    theme.section,
    subdued && theme['section-subdued']
  );

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default themr(CARD, baseTheme)(CardSection) as ThemedComponentClass<Props, {}>;
