import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { Action } from '../../types';
import { buttonFrom } from '../Button';
import ButtonGroup from '../ButtonGroup';
import { CARD } from '../ThemeIdentifiers';

import Header from './Header';
import Section from './Section';
import * as baseTheme from './Card.scss';

export interface Props {
  title?: string;
  children?: React.ReactNode;
  subdued?: boolean;
  sectioned?: boolean;
  actions?: Action[];
  primaryFooterAction?: Action;
  secondaryFooterAction?: Action;
  theme?: any;
}

class Card extends React.PureComponent<Props, never> {
  static Section = Section;

  render() {
    const {
      children,
      title,
      subdued,
      sectioned,
      actions,
      primaryFooterAction,
      secondaryFooterAction,
      theme,
    } = this.props;

    const className = classNames(theme.card, subdued && theme.subdued);

    const headerMarkup = title
      ? <Header actions={actions}>{title}</Header>
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

export default themr(CARD, baseTheme)(Card) as ThemedComponentClass<Props, {}>;
