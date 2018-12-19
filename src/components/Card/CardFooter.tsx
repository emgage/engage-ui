import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { Action } from '../../types';
import { buttonFrom } from '../Button';
import ButtonGroup from '../ButtonGroup';
import { CARD } from '../ThemeIdentifiers';
import * as baseTheme from './Card.scss';
import { classNames } from '@shopify/react-utilities/styles';

export interface Props {
  // Card footer related components to render inside this card footer.
  children?: React.ReactNode;
  // Primary action in the card footer 
  primaryFooterAction?: Action;
  // Secondary action in the card footer
  secondaryFooterAction?: Action;
  // Custom style
  componentStyle?: any;
  // Custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

const cardFooter = ({ children, primaryFooterAction, secondaryFooterAction, theme, componentStyle, componentClass  }: Props) => {

  const primaryFooterActionMarkup = primaryFooterAction
    ? buttonFrom(primaryFooterAction, { primary: true })
    : null;

  const secondaryFooterActionMarkup = secondaryFooterAction
    ? buttonFrom(secondaryFooterAction)
    : null;

  const footerMarkup = primaryFooterActionMarkup || secondaryFooterActionMarkup
    ? (
      <div className={theme.footer}>
        <ButtonGroup>
          {primaryFooterActionMarkup}
          {secondaryFooterActionMarkup}
        </ButtonGroup>
      </div>
    )
    : <div>{children}</div>;

  const footerClass = classNames(
        theme.footer,
        componentClass
      );

  return (
    <div style={componentStyle} className={footerClass}>
      {footerMarkup}
    </div>
  );
};

export default themr(CARD, baseTheme)(cardFooter) as ThemedComponentClass<Props, {}>;
