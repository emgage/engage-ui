import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Subheading from '../Subheading';
import { CARD } from '../ThemeIdentifiers';

import * as baseTheme from './Card.scss';

export interface Props {
  // Title content for the card section.
  customTitle?: string;
  // Card section related components to render inside this card section.
  children?: React.ReactNode;
  // A less prominent card section
  subdued?: boolean;
  // Theme to be injected via css-themr.
  theme?: any;
}

const section = ({ children, customTitle, subdued, theme }: Props) => {
  const headerContent = customTitle
    ? (
      <div className={theme.sectionHeader}>
        <Subheading>{customTitle}</Subheading>
      </div>
    )
    : null;

  const className = classNames(
    theme.section,
    subdued && theme['section-subdued']
  );

  return (
    <div className={className}>
      {headerContent}
      {children}
    </div>
  );
};

export default themr(CARD, baseTheme)(section) as ThemedComponentClass<Props, {}>;
