import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { SPINNER } from '../ThemeIdentifiers';
import * as baseTheme from './Spinner.scss';

import { spinnerLarge, spinnerSmall } from '../../icons';

export type Color = 'reverse' | 'normal' | 'disabled';

export type Size = 'small' | 'large';

export interface Props {
  // Size of Spinner. It can be small or large
  componentSize?: Size;
  // Color of Spinner. It can be reverse, normal or disabled
  componentColor?: Color;
  // Visually hidden text for screen readers
  accessibilityLabel?: string;
  // Theme to be injected via css-themr
  theme?: any;
  // Set the style via css
  componentStyle?: React.CSSProperties;
}

const spinner = ({
  componentSize = 'large',
  componentColor = 'normal',
  accessibilityLabel,
  theme,
  componentStyle,
}: Props) => {
  const className = classNames(
    theme.spinner,
    componentColor && theme[variationName('color', componentColor)],
    componentSize && theme[variationName('size', componentSize)]
   );

  const spinnerSvg = componentSize === 'large'
    ? spinnerLarge
    : spinnerSmall;

  let contentMarkup: React.ReactNode;

  if (spinnerSvg) {
    contentMarkup = (
      <svg
        className={className}
        style={componentStyle}
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
