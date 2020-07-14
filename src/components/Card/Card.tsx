import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { CARD } from '../ThemeIdentifiers';
import * as baseTheme from './Card.scss';
import Context from './Context';

export interface Props {
  // Card related components to render inside this card.
  children?: React.ReactNode;
  // Custom style
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when clicked.
  onClick?(e: React.FormEvent<HTMLElement>): void;
}

class Card extends React.PureComponent<Props, never> {
  render() {
    const {
      children,
      theme,
      componentStyle,
      componentClass,
      onClick,
    } = this.props;

    const className = classNames(theme.card, componentClass);

    return (
      <div style={componentStyle} className={className} onClick={onClick}>
        <Context.Provider value={{ cardHasOnClick: onClick ? true : false }}>
          {
            React.Children.map(children, (child: React.ReactElement<any>) => {
              return React.cloneElement(child);
            })
          }
        </Context.Provider>
      </div>
    );
  }
}

export default themr(CARD, baseTheme)(Card) as ThemedComponentClass<Props, {}>;
