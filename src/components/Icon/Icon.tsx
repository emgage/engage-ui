import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { SVGSource } from '@shopify/images';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import {
  add,
  alert,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  calendar,
  cancel,
  cancelSmall,
  caretDown,
  caretUp,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  circleCancel,
  circleChevronDown,
  circleChevronLeft,
  circleChevronRight,
  circleChevronUp,
  circlePlus,
  conversation,
  delete as deleteIcon,
  disable,
  dispute,
  duplicate,
  embed,
  export as exportIcon,
  external,
  horizontalDots,
  import as importIcon,
  notes,
  print,
  refresh,
  risk,
  search,
  spinner,
  view,
} from '../../icons';

import { ICON } from '../ThemeIdentifiers';
import * as baseTheme from './Icon.scss';

export type Color = (
  'white' |
  'black' |
  'skyLighter' | 'skyLight' | 'sky' | 'skyDark' |
  'inkLightest' | 'inkLighter' | 'inkLight' | 'ink' |
  'blueLighter' | 'blueLight' | 'blue' | 'blueDark' | 'blueDarker' |
  'indigoLighter' | 'indigoLight' | 'indigo' | 'indigoDark' | 'indigoDarker' |
  'tealLighter' | 'tealLight' | 'teal' | 'tealDark' | 'tealDarker' |
  'greenLighter' | 'green' | 'greenDark' |
  'yellowLighter' | 'yellow' | 'yellowDark' |
  'orange' |
  'redLighter' | 'red' | 'redDark' |
  'purple'
);

export const BUNDLED_ICONS = {
  add,
  alert,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  calendar,
  cancel,
  cancelSmall,
  caretDown,
  caretUp,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  circleCancel,
  circleChevronDown,
  circleChevronLeft,
  circleChevronRight,
  circleChevronUp,
  circlePlus,
  conversation,
  disable,
  dispute,
  duplicate,
  embed,
  external,
  horizontalDots,
  notes,
  print,
  refresh,
  risk,
  search,
  spinner,
  view,
  delete: deleteIcon,
  export: exportIcon,
  import: importIcon,
};

const COLORS_WITH_BACKDROPS = ['teal', 'tealDark', 'greenDark', 'redDark', 'yellowDark', 'ink'];

export interface Props {
  // Souce for an icon.
  source: SVGSource | 'placeholder' | keyof typeof BUNDLED_ICONS;
  // To give colors for icons.
  componentColor?: Color;
  // Show a backdrop behind the icon.
  backdrop?: boolean;
  // Descriptive text to be read to screenreaders.
  accessibilityLabel?: string;
  // To provide styling.
  componentStyle?: React.CSSProperties;
  // Theme to be injected via css-themr.
  theme?: any;
  callbackValue?: any;
  onClick?(id: number | string): void;
}

const icon = ({
  callbackValue,
  source,
  componentColor,
  backdrop,
  accessibilityLabel,
  componentStyle,
  theme,
  onClick,
}: Props) => {
  if (componentColor && backdrop && COLORS_WITH_BACKDROPS.indexOf(componentColor) < 0) {
    // tslint:disable-next-line no-console
    console.warn(`The ${componentColor} icon doesn't accept backdrops. The icon colors that have backdrops are: ${COLORS_WITH_BACKDROPS.join(', ')}`);
  }

  const className = classNames(
    theme.icon,
    componentColor && theme[variationName('color', componentColor)],
    backdrop && theme.hasBackdrop
  );

  let contentMarkup: React.ReactNode;

  if (!source) {
    // tslint:disable-next-line no-console
    console.warn(`The source prop is null in Icon Component.`);
  } else if (source === 'placeholder') {
    contentMarkup = <div className={theme.placeholder} />;
  } else {
    const iconSource = typeof source === 'string' ? BUNDLED_ICONS[source] : source;
    if (iconSource) {
      contentMarkup = (
        <svg
          className={theme.svg}
          viewBox={iconSource.viewBox}
          dangerouslySetInnerHTML={{ __html: iconSource.body }}
        />
      );
    }
  }

  return (
    <span className={className} style={componentStyle} aria-label={accessibilityLabel} onClick={(event) => { onClick ? onClick((callbackValue ? callbackValue : event)) : ''; }}>
      {contentMarkup}
    </span>
  );
};

export default themr(ICON, baseTheme)(icon) as ThemedComponentClass<Props, {}>;
