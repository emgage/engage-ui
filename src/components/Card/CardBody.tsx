import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { CARD } from '../ThemeIdentifiers';
import CardSection from './CardSection';
import Context from './Context';

import * as baseTheme from './Card.scss';

export interface Props {
  // Card section related components to render inside this card section.
  children?: React.ReactNode;
  // Auto wrap content in section
  sectioned?: boolean;
  // Custom style
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when clicked.
  onClick?(e: React.FormEvent<HTMLElement>): void;
}

const cardBody = ({ children, sectioned = false, theme, componentStyle, componentClass, onClick }: Props) => {
  const bodyContent = sectioned
    ? <CardSection>{children}</CardSection>
    : children;

  const className = classNames(
    theme.body,
    componentClass
  );

  const context = React.useContext(Context);

  const onClickHandler = (e: React.FormEvent<HTMLElement>) => {
    (context.cardHasOnClick && onClick) && e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <div
      className={className}
      style={componentStyle}
      onClick={onClickHandler}
    >
      {bodyContent}
    </div>
  );
};

export default themr(CARD, baseTheme)(cardBody) as ThemedComponentClass<Props, {}>;
