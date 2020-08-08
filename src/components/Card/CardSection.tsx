import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import Context from './Context';
import { CARD } from '../ThemeIdentifiers';

import * as baseTheme from './Card.scss';

export interface Props {
  // Card section related components to render inside this card section.
  children?: React.ReactNode;
  // A less prominent card section
  subdued?: boolean;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when clicked.
  onClick?(e: React.FormEvent<HTMLElement>): void;
}

const CardSection = ({ children, subdued = false, theme, onClick }: Props) => {

  const className = classNames(
    theme.section,
    subdued && theme['section-subdued']
  );

  const context = React.useContext(Context);

  const onClickHandler = (e: React.FormEvent<HTMLElement>) => {
    (context.cardHasOnClick && onClick) && e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <div
      className={className}
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
};

export default themr(CARD, baseTheme)(CardSection) as ThemedComponentClass<Props, {}>;
