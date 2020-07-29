import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { elementChildren } from '@shopify/react-utilities/components';
import Item from './Item';

import { TOGGLEBUTTON_GROUP } from '../ThemeIdentifiers';
import * as baseTheme from './ToggleButtonGroup.scss';
import Labelled, { Action } from '../Labelled';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

export interface Props {
  // Label for the input.
  label?: string;
  componentStyle?: any;
  // Set a custom class
  componentClass?: string;
  // Display true or false value. Join buttons as segmented group.
  segmented?: boolean;
  // Name of button, Button components.
  children?: React.ReactNode;
  // ID for the input.
  componentId?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // Adds an action to the label.
  labelAction?: Action;
  // Additional hint text to display.
  helpText?: React.ReactNode;
}

const getUniqueID = createUniqueIDFactory('ToggleButtonGroup');

const ToggleButtonGroup = ({
  componentStyle,
  componentClass,
  children,
  segmented = false,
  theme,
  label = '',
  labelAction,
  helpText,
  componentId = getUniqueID()
}: Props) => {
  const className = classNames(
    theme.ToggleButtonGroup,
    componentClass,
    segmented && theme.segmented
  );

  const labelStyle = classNames(
    theme.labelStyle
  );

  const contents = elementChildren(children)
    .map((child, index) => <Item button={child} key={index} theme={theme}  />);

  return (
    <Labelled
      label={label}
      componentId={componentId}
      action={labelAction}
      helpText={helpText}
      componentClass={labelStyle}
      theme={theme}
    >

      <div className={className} style={componentStyle}>{contents}</div>
    </Labelled>);
};

export default themr(TOGGLEBUTTON_GROUP, baseTheme)(ToggleButtonGroup) as ThemedComponentClass<Props, {}>;
