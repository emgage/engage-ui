import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { TAB } from '../ThemeIdentifiers';

import * as baseTheme from './Tab.scss';

export interface Props {
  tabcontent?: React.ReactNode;
  icon?: any;
  activetab?: number;
  cardindex?: number;
  theme?: any;
  children?: any;
  onClick?(): void;
}

const tab = ({ tabcontent, icon, activetab, cardindex, onClick, theme, children }: Props) => {
  const barClassName = classNames(
    theme.tab,
    activetab === cardindex ? theme.active : ''
  );

  return (
    <div className={barClassName} onClick={onClick}>
      {tabcontent}
    </div>
  );
};

export default themr(TAB, baseTheme)(tab) as ThemedComponentClass<Props, {}>;
