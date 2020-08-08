import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { CARD } from '../ThemeIdentifiers';
import * as baseTheme from './Card.scss';
import { classNames } from '@shopify/react-utilities/styles';
import Context from './Context';

export interface Props {
  // Card footer related components to render inside this card footer.
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

const cardFooter = ({ children, theme, componentStyle, componentClass, onClick }: Props) => {

  const footerClass = classNames(
        theme.footer,
        componentClass
  );

  const context = React.useContext(Context);

  const onClickHandler = (e: React.FormEvent<HTMLElement>) => {
    (context.cardHasOnClick && onClick) && e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <div
      style={componentStyle}
      className={footerClass}
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
};

export default themr(CARD, baseTheme)(cardFooter) as ThemedComponentClass<Props, {}>;
