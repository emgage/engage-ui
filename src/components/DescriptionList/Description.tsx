import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';

// All prototypes type
export interface Props {
  // Set children to display description list with description 
  children?:React.ReactNode;
  // Set theme for description
  theme?: any;
}

const description = ({
  children,
  theme,
}: Props) => {
  const classNameDescription = classNames(theme.description);
  return (
    <dd className={classNameDescription}>{children}</dd>
  );
};

export default themr(DESCRIPTIONLIST, baseTheme)(description) as ThemedComponentClass<Props, {}>;
