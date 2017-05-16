import * as React from 'react';
import { themr } from 'react-css-themr';

import { FORM_LAYOUT } from '../ThemeIdentifiers';

import * as baseTheme from './FormLayout.scss';

export interface Props {
  children?: React.ReactNode,
  theme?: any,
}

const Item = (props: Props)  => {
  const {
    children,
    theme,
    ...otherProps,
  } = props;

  return (
    <div className={theme.Item}>
      {React.Children.map(children, (child: React.ReactElement<{}>) => {
          return React.cloneElement(child, otherProps);
      })}
    </div>
  );
};

export default themr(FORM_LAYOUT, baseTheme)(Item);
