import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import {DisableableAction} from '../../types';
import {buttonsFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';
import Stack, {Item as StackItem} from '../Stack';
import Heading from '../Heading';
import { CARD } from '../ThemeIdentifiers';

import * as baseTheme from './Card.scss';

export interface Props {
  children?: React.ReactNode,
  actions?: DisableableAction[],
  theme?: any,
}

const Header = ({children, actions, theme}: Props) => {
  const actionMarkup = actions
    ? (
      <ButtonGroup>
        {buttonsFrom(actions, {plain: true})}
      </ButtonGroup>
    )
    : null;

  const headingMarkup = actionMarkup
    ? (
      <Stack alignment="baseline">
        <StackItem fill>
          <Heading>{children}</Heading>
        </StackItem>

        {actionMarkup}
      </Stack>
    )
    : <Heading>{children}</Heading>;

  return (
    <div className={theme.Header}>
      {headingMarkup}
    </div>
  );
}

export default themr(CARD, baseTheme)(Header) as ThemedComponentClass<Props, {}>;
