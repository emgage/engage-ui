import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';
import { wrapWithComponent } from '../../utilities';

import { FORM_LAYOUT } from '../ThemeIdentifiers';
import Item from './Item';

import * as baseTheme from './FormLayout.scss';

export interface Props {
  children?: React.ReactNode;
  condensed?: boolean;
  title?: string;
  helpText?: React.ReactNode;
  style?: React.CSSProperties;
  theme?: any;
}

const getUniqueID = createUniqueIDFactory('FormLayoutGroup');

class Group extends React.Component<Props, {}> {
  render() {
    const { children, condensed, title, helpText, style, theme } = this.props;
    const className = classNames(
      condensed && theme.condensed,
    );

    const id = getUniqueID();

    let helpTextElement = null;
    let helpTextID: undefined | string;
    let titleElement = null;
    let titleID: undefined | string;

    if (helpText) {
      helpTextID = `${id}HelpText`;
      helpTextElement = <div id={helpTextID} className={theme.helpText}>{helpText}</div>;
    }

    if (title) {
      titleID = `${id}Title`;
      titleElement = <div id={titleID} className={theme.title}>{title}</div>;
    }

    const itemsMarkup = React.Children.map(children, child => wrapWithComponent(child, Item));

    return (
      <div
        role="group"
        className={className}
        aria-labelledby={titleID}
        aria-describedby={helpTextID}
        style={style}
      >
        {titleElement}
        <div className={theme.items}>
          {itemsMarkup}
        </div>
        {helpTextElement}
      </div>
    );
  }
}

export default themr(FORM_LAYOUT, baseTheme)(Group) as ThemedComponentClass<Props, {}>;
