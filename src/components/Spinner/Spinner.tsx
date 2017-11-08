import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { SPINNER } from '../ThemeIdentifiers';
import * as baseTheme from './Spinner.scss';

import { spinnerLarge, spinnerSmall } from '../../icons';

export type Color = 'white' | 'teal' | 'inkLightest';

export type Size = 'small' | 'large';

export interface Props {
  size?: Size;
  color?: Color;
  accessibilityLabel?: string;
  theme?: any;
  style?: React.CSSProperties;
}

const spinner = ({
  size = 'large',
  color = 'teal',
  accessibilityLabel,
  theme,
  style,
}: Props) => {
  const className = classNames (
    theme.spinner,
    color && theme[variationName('color', color)],
    size && theme[variationName('size', size)]
   );

  const spinnerSvg = size === 'large'
    ? spinnerLarge
    : spinnerSmall;

  let contentMarkup: React.ReactNode;

  if (spinnerSvg) {
    contentMarkup = (
      <svg
        className={className}
        style={style}
        viewBox={spinnerSvg.viewBox}
        dangerouslySetInnerHTML={{ __html: spinnerSvg.body }}
      />
    );
  }

  return (
    <span aria-label={accessibilityLabel}>
      {contentMarkup}
    </span>
  );
};

export { spinner as UnthemedSelect };
export default themr(SPINNER, baseTheme)(spinner) as ThemedComponentClass<Props, {}>;
