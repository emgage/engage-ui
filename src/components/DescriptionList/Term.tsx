import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';

export interface Props {
  children?:React.ReactNode;
  // Theme to be injected via css-themr
  theme?: any;
  // Style to be applied. Available options: Inline | Stacked
  style?:string;
}

const term = ({
  children,
  style,
  theme,
}: Props) => {
  return (
    <dt className={style}>{children}</dt>
  );
};

export default themr(DESCRIPTIONLIST, baseTheme)(term) as ThemedComponentClass<Props, {}>;
