import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { FORM_LAYOUT } from '../ThemeIdentifiers';

import * as baseTheme from './FormLayout.scss';

export interface Props {
  children?: React.ReactNode;
  theme?: any;
}

const item = (props: Props)  => {
  const {
    children,
    theme,
    ...otherProps,
  } = props;

  return (
    <div className={theme.item}>
      {React.Children.map(children, (child: React.ReactElement<{}>) => {
        return React.cloneElement(child, otherProps);
      })}
    </div>
  );
};

export default themr(FORM_LAYOUT, baseTheme)(item) as ThemedComponentClass<Props, {}>;
