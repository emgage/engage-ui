import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { CARD } from '../ThemeIdentifiers';
import CardSection from './CardSection';

import * as baseTheme from './Card.scss';

export interface Props {
  // Card section related components to render inside this card section.
  children?: React.ReactNode;
  // Auto wrap content in section
  sectioned?: boolean;
  // Custom style
  componentStyle?: any;
  // Custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

const cardBody = ({ children, sectioned, theme, componentStyle, componentClass }: Props) => {
  const bodyContent = sectioned
    ? <CardSection>{children}</CardSection>
    : children;

  const className = classNames(
    theme.body,
    componentClass
  );

  return (
    <div className={className} style={componentStyle}>
      {bodyContent}
    </div>
  );
};

export default themr(CARD, baseTheme)(cardBody) as ThemedComponentClass<Props, {}>;
