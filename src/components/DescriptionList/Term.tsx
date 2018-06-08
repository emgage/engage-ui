import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';

// All prototypes type
export interface Props {
  // Set children to display description list with term 
  children?:React.ReactNode;
  // Set theme for term
  theme?: any;
  // Set style for term
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
