import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Subheading from '../Subheading';
import { CARD } from '../ThemeIdentifiers';

import * as baseTheme from './Card.scss';

export interface Props {
  title?: string;
  children?: React.ReactNode;
  subdued?: boolean;
  theme?: any;
}

const section = ({ children, title, subdued, theme }: Props) => {
  const headerContent = title
    ? (
      <div className={theme.sectionHeader}>
        <Subheading>{title}</Subheading>
      </div>
    )
    : null;

  const className = classNames(
    theme.section,
    subdued && theme['section-subdued'],
  );

  return (
    <div className={className}>
      {headerContent}
      {children}
    </div>
  );
};

export default themr(CARD, baseTheme)(section) as ThemedComponentClass<Props, {}>;
