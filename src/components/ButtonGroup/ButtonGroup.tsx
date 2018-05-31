import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { elementChildren } from '@shopify/react-utilities/components';
// import {Props as ButtonProps} from '../Button';
import Item from './Item';

import { BUTTON_GROUP } from '../ThemeIdentifiers';
import * as baseTheme from './ButtonGroup.scss';

export interface Props {
  // Display true or false value. Join buttons as segmented group.
  segmented?: boolean;
  // Name of button, Button components.
  children?: React.ReactNode;
  // Theme to be injected via css-themr.
  theme?: any;
}

const buttonGroup = ({
  children,
  segmented,
  theme,
}: Props) => {
  const className = classNames(
    theme.buttonGroup,
    segmented && theme.segmented
  );

  const contents = elementChildren(children)
    .map((child, index) => <Item button={child} key={index} />);

  return <div className={className}>{contents}</div>;
};

export default themr(BUTTON_GROUP, baseTheme)(buttonGroup) as ThemedComponentClass<Props, {}>;
