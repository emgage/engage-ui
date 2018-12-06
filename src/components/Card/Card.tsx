import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { Action } from '../../types';
import { buttonFrom } from '../Button';
import ButtonGroup from '../ButtonGroup';
import { CARD } from '../ThemeIdentifiers';

import Header from './Header';
import Section from './Section';
import * as baseTheme from './Card.scss';

export interface Props {
  // Title content for the card.
  componentTitle?: string;
  // Card related components to render inside this card.
  children?: React.ReactNode;
  // A less prominent card
  subdued?: boolean;
  // Auto wrap content in section
  sectioned?: boolean;
  // Card actions
  actions?: Action[];
  // Primary action in the card footer 
  primaryFooterAction?: Action;
  // Secondary action in the card footer
  secondaryFooterAction?: Action;
  // Theme to be injected via css-themr.
  theme?: any;
}

class Card extends React.PureComponent<Props, never> {
  static Section = Section;

  render() {
    const {
      children,
      componentTitle,
      subdued,
      sectioned,
      actions,
      primaryFooterAction,
      secondaryFooterAction,
      theme,
    } = this.props;

    const className = classNames(theme.card, subdued && theme.subdued);

    const headerMarkup = componentTitle
      ? <Header actions={actions}>{componentTitle}</Header>
      : null;

    const content = sectioned
      ? <Section>{children}</Section>
      : children;

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
      : null;

    return (
      <div className={className}>
        {headerMarkup}
        {content}
        {footerMarkup}
      </div>
    );
  }
}

export default themr(CARD, baseTheme)(Card);
