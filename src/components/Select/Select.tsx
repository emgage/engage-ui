import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

import Labelled, { Action, Error, helpTextID, errorID } from '../Labelled';
import Icon from '../Icon';
import { SELECT } from '../ThemeIdentifiers';

import * as baseTheme from './Select.scss';
import arrowSvg from './icons/arrow.svg';

export type Option = string | {
  value: string,
  label: string,
};

export interface Group {
  title: string;
  options: Option[];
}

export interface Props {
  // List of options to choose from 
  options?: Option[];
  // List of option groups to choose from
  groups?: (Group | Option)[];
  // Label for the Select
  label: string;
  // Adds an action to the label
  labelAction?: Action;
  // Visually hide the label
  labelHidden?: boolean;
  // Additional text to aide in use
  helpText?: React.ReactNode;
  // ID for form input
  componentId?: string;
  // Name for form input
  name?: string;
  // Display an error state
  errors?: [Error];
  // Disable input
  disabled?: boolean;
  required?: boolean;
  // Value for form input
  value?: string;
  // Content to display when component render.
  placeholder?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when selection is changed
  onChange?(selected: string): void;
  // Callback when Select is focussed
  onFocus?(): void;
  // Callback when focus is removed
  onBlur?(): void;
}

const getUniqueID = createUniqueIDFactory('Select');

const select = ({
  componentId = getUniqueID(),
  name,
  groups,
  options,
  labelHidden,
  labelAction,
  helpText,
  label,
  errors,
  value,
  placeholder,
  disabled,
  required,
  onChange,
  onFocus,
  onBlur,
  theme,
}: Props) => {
  let optionsMarkup: React.ReactNode;

  if (options != null) {
    optionsMarkup = options.map(renderOption);
  } else if (groups != null) {
    optionsMarkup = groups.map(renderGroup);
  }

  const isPlaceholder = value == null && placeholder != null;
  const className = classNames(
    theme.select,
    errors && theme.error,
    disabled && theme.disabled,
    isPlaceholder && theme.placeholder
  );

  const handleChange = onChange
    ? ((event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.currentTarget.value))
    : undefined;

  const describedBy: string[] = [];
  if (helpText) { describedBy.push(helpTextID(componentId)); }
  if (errors) { describedBy.push(errorID(componentId)); }

  const placeholderOption = isPlaceholder
    ? <option label={placeholder} disabled hidden />
    : null;

  return (
    <Labelled
      componentId={componentId}
      label={label}
      errors={errors}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
      required={required}
    >
      <div className={className}>
        <select
          id={componentId}
          name={name ? name : 'select'}
          value={value}
          className={theme.input}
          disabled={disabled}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          aria-invalid={Boolean(errors)}
          aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
        >
          {placeholderOption}
          {optionsMarkup}
        </select>

        <div className={theme.icon}>
          <Icon source={arrowSvg} />
        </div>
        <div className={theme.backdrop} />
      </div>
    </Labelled>
  );
};

function renderOption(option: Option) {
  if (typeof option === 'string') {
    return <option key={option} value={option}>{option}</option>;
  }

  return <option key={option.value} value={option.value}>{option.label}</option>;
}

function renderGroup(groupOrOption: Group | Option) {
  if (groupOrOption.hasOwnProperty('title')) {
    const { title, options } = groupOrOption as Group;
    return (
      <optgroup label={title} key={title}>
        {options.map(renderOption)}
      </optgroup>
    );
  }

  return renderOption(groupOrOption as Option);
}

export { select as UnthemedSelect };
export default themr(SELECT, baseTheme)(select) as ThemedComponentClass<Props, {}>;
