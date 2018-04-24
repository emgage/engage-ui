import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { LIST } from '../ThemeIdentifiers';

import * as baseTheme from './List.scss';

export interface Props {
  term?: string;
  description?: string;
  theme?: any;
}

const item = ({ term, description, theme }: Props) => {
  return <dt className={theme.item}>{term}</dt><dl className={theme.item}>{description}</dl>;
};

export default themr(LIST, baseTheme)(item) as ThemedComponentClass<Props, {}>;
