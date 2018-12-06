import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
// import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import { Error, helpTextID } from '../Choice';
import FlexBox from '../FlexBox';

import { CHECKBOX } from '../ThemeIdentifiers';

import * as baseTheme from './Checkbox.scss';

export interface Props {
  // Label for the checkbox
  label?: string;
  // Visually hide the label
  labelHidden?: boolean;
  // Checkbox is selected or not
  checked?: boolean;
  // checkbox is indeterminante or not
  indeterminante?: boolean;
  // Additional text to aide in use
  helpText?: React.ReactNode;
  // ID for form input
  componentId?: string;
  // Name for form input
  name?: string;
  // Value for form input
  value?: string;
  // Display an error state
  error?: Error;
  // Disabled checkbox name
  disabled?: boolean;
  // Theme to be injected via css-themr
  theme?: any;
  // Callback when checkbox is toggled
  onChange?(newValue: boolean): void;
  // Callback when checkbox is focussed
  onFocus?(): void;
  // Callback when focus is removed
  onBlur?(): void;
}

export interface State {
  checked: boolean;
}
const getUniqueID = createUniqueIDFactory('Checkbox');

class Checkbox extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: props.checked || false,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.checked !== undefined) {
      this.setState({ checked: newProps.checked });
    }
  }

  handleChange = () => {
    const { onChange } = this.props;

    this.setState({ checked: !this.state.checked });

    if (onChange) {
      onChange(!this.state.checked);
    }
  }

  render() {
    const { checked } = this.state;
    const {
      componentId = getUniqueID(),
      disabled = false,
      helpText,
      label = '',
      name = getUniqueID(),
      theme,
    } = this.props;

    const describedBy: string[] = [];
    if (helpText) {
      describedBy.push(helpTextID(componentId));
    }

    return (
      <FlexBox direction ={helpText ? 'Column' : 'Row'} >
        <div className={theme.customControl} onClick={this.handleChange}>
          <input
            type="checkbox"
            className={ !this.props.indeterminante ?  theme.customControlInput : theme.customControlInputIndeterminante}
            id={componentId}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={() => {}}
            aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
            aria-checked={checked}
          />
          <label className={theme.customControlLabel} htmlFor={componentId}>{label}</label>
        </div>
        {
          helpText ? <div>{helpText}</div> : null
        }
      </FlexBox>
    );
  }
}

export default themr(CHECKBOX, baseTheme)(Checkbox) as ThemedComponentClass<Props, {}>;
