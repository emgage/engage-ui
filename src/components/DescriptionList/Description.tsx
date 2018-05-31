import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';

export interface Props {
  // Display description list with term and description elements
  children?:React.ReactNode;
  // Theme to be injected via css-themr
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
