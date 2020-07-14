import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { DisableableAction } from '../../types';
import { buttonsFrom } from '../Button';
import ButtonGroup from '../ButtonGroup';
import Stack, { Item as StackItem } from '../Stack';
import Heading from '../Heading';
import { CARD } from '../ThemeIdentifiers';
import { classNames } from '@shopify/react-utilities/styles';
import Context from './Context';

import * as baseTheme from './Card.scss';

export interface Props {
  // Card header related components to render inside this card header.
  children?: React.ReactNode;
  // Card header actions
  actions?: DisableableAction[];
  // Custom style
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when clicked.
  onClick?(e: React.FormEvent<HTMLElement>): void;
}

const cardHeader = ({ children, actions, theme, componentStyle, componentClass, onClick }: Props) => {
  const actionMarkup = actions
    ? (
      <ButtonGroup theme={theme}>
        {buttonsFrom(actions, { plain: true })}
      </ButtonGroup>
    )
    : null;

  const headingMarkup = actionMarkup
    ? (
      <Stack alignment="baseline" theme={theme}>
        <StackItem theme={theme} fill>
          <Heading>{children}</Heading>
        </StackItem>

        {actionMarkup}
      </Stack>
    )
    : <Heading theme={theme}>{children}</Heading>;

  const headerClass = classNames(
    theme.header,
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
      className={headerClass}
      onClick={onClickHandler}
    >
      {headingMarkup}
    </div>
  );
};

export default themr(CARD, baseTheme)(cardHeader) as ThemedComponentClass<Props, {}>;
