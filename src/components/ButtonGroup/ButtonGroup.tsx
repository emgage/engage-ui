import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { elementChildren } from '@shopify/react-utilities/components';
// import {Props as ButtonProps} from '../Button';
import Item from './Item';

import { BUTTON_GROUP } from '../ThemeIdentifiers';
import * as baseTheme from './ButtonGroup.scss';

export interface Props {
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Display true or false value. Join buttons as segmented group.
  segmented?: boolean;
  // Name of button, Button components.
  children?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
}

const buttonGroup = ({
  componentStyle,
  componentClass,
  children,
  segmented = false,
  theme,
}: Props) => {
  const className = classNames(
    theme.buttonGroup,
    componentClass,
    segmented && theme.segmented
  );

  const contents = elementChildren(children)
    .map((child, index) => <Item button={child} key={index} theme={theme} />);

  return <div className={className} style={componentStyle}>{contents}</div>;
};

export default themr(BUTTON_GROUP, baseTheme)(buttonGroup) as ThemedComponentClass<Props, {}>;
