import * as React from 'react';
import { ThemedComponentClass, themr } from '@friendsofreactjs/react-css-themr';
import { SWITCHCHECKBOX } from '../ThemeIdentifiers';
import * as baseTheme from './SwitchCheckboxIcon.scss';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { classNames } from '@shopify/react-utilities/styles';
import Icon from '../Icon/Icon';

export interface Props {
  // Set theme for SwitchCheckbox
  theme?: any;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
  // Set a custom class
  componentClass?: string;
  componentId?: string;
  children?: React.ReactNode;
  // component props to handle toggle
  disabled?: boolean;
  isOpen: boolean;
  handleToggle: (value: boolean) => void;
}

const getUniqueID = createUniqueIDFactory('SwitchCheckboxIcon');

const SwitchCheckboxIcon = (props: Props) => {
  const { theme, componentClass, componentStyle, componentId = getUniqueID() } = props;
  const { children, isOpen, disabled, handleToggle } = props;

  const className = classNames(
        componentClass,
        theme.switchCheckbox
    );
  return (<div style={componentStyle}  className={className}>
            <span className={theme.OuterSpan}>
                <input
                    id={componentId}
                    disabled={disabled}
                    checked={isOpen}
                    onChange={() => handleToggle(!isOpen)}
                    type="checkbox"
                />
                <span className={theme.InnerSpan}>
                  <span className={theme.innerCircle}>
                    <Icon source="cancel" componentColor="inkLighter" componentClass={theme.Cancel}></Icon>
                    <Icon source="check" componentColor="blue" componentClass={theme.Accept}></Icon>
                  </span>
                </span>
            </span>
            {children && <label htmlFor={componentId}>
                {children}
            </label>}
        </div>);
};

export default themr(SWITCHCHECKBOX, baseTheme)(SwitchCheckboxIcon) as ThemedComponentClass<Props, {}>;
