import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { wrapWithComponent } from '@shopify/react-utilities/components';

import Scrollable from '../Scrollable';
import { DROPDOWN } from '../ThemeIdentifiers';

import Section from './Section';
import * as baseTheme from './Dropdown.scss';

export interface Props {
  fixed?: boolean;
  sectioned?: boolean;
  children?: React.ReactNode;
  theme?: any;
}

const pane = ({ fixed, sectioned, children, theme }: Props) => {
  const className = classNames(
    theme.pane,
    fixed && theme['pane-fixed']
  );

  const content = sectioned
    ? wrapWithComponent(children, Section)
    : children;

  return fixed
    ? (
      <div className={className}>
        {content}
      </div>
    )
    : (
      <Scrollable className={className}>
        {content}
      </Scrollable>
    );
};

export default themr(DROPDOWN, baseTheme)(pane) as ThemedComponentClass<Props, {}>;
