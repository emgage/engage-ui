import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { SPINNER } from '../ThemeIdentifiers';
import * as baseTheme from './Spinner.scss';

import { spinnerLarge, spinnerSmall } from '../../icons';

export type Color = 'white' | 'teal' | 'inkLightest';

export type Size = 'small' | 'large';

export interface Props {
  // Size of Spinner. It can be small or large
  customSize?: Size;
  // Color of Spinner. It can be white, teal or inkLightest
  customColor?: Color;
  // Visually hidden text for screen readers
  accessibilityLabel?: string;
  // Theme to be injected via css-themr
  theme?: any;
  // Set the style via css
  customStyle?: React.CSSProperties;
}

const spinner = ({
  customSize = 'large',
  customColor = 'teal',
  accessibilityLabel,
  theme,
  customStyle,
}: Props) => {
  const className = classNames (
    theme.spinner,
    customColor && theme[variationName('color', customColor)],
    customSize && theme[variationName('size', customSize)]
   );

  const spinnerSvg = customSize === 'large'
    ? spinnerLarge
    : spinnerSmall;

  let contentMarkup: React.ReactNode;

  if (spinnerSvg) {
    contentMarkup = (
      <svg
        className={className}
        style={customStyle}
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
