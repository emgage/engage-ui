import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { CARD } from '../ThemeIdentifiers';
import * as baseTheme from './Card.scss';

export interface Props {
  // Card related components to render inside this card.
  children?: React.ReactNode;
  // Custom style
  componentStyle?: any;
  // Custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

class Card extends React.PureComponent<Props, never> {
  render() {
    const {
      children,
      theme,
      componentStyle,
      componentClass,
    } = this.props;

    const className = classNames(theme.card, componentClass);

    return (
      <div style={componentStyle} className={className}>
        {
          React.Children.map(children, (child: React.ReactElement<any>) => {
            return React.cloneElement(child);
          })
        }
      </div>
    );
  }
}

export default themr(CARD, baseTheme)(Card) as ThemedComponentClass<Props, {}>;
