import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
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
  options?: Option[];
  groups?: (Group | Option)[];
  label: string;
  labelAction?: Action;
  labelHidden?: boolean;
  helpText?: React.ReactNode;
  id?: string;
  name?: string;
  error?: Error;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  theme?: any;
  onChange?(selected: string): void;
  onFocus?(): void;
  onBlur?(): void;
}

const PLACEHOLDER_VALUE = '__placeholder__';
const getUniqueID = createUniqueIDFactory('Select');

const select = ({
  id = getUniqueID(),
  name,
  groups,
  options,
  labelHidden,
  labelAction,
  helpText,
  label,
  error,
  value,
  placeholder,
  disabled,
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
    error && theme.error,
    disabled && theme.disabled,
    isPlaceholder && theme.placeholder,
  );

  const handleChange = onChange
    ? ((event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.currentTarget.value))
    : undefined;

  const describedBy: string[] = [];
  if (helpText) { describedBy.push(helpTextID(id)); }
  if (error && typeof error === 'string') { describedBy.push(errorID(id)); }

  const placeholderOption = isPlaceholder
    ? <option label={placeholder} value={PLACEHOLDER_VALUE} disabled hidden />
    : null;

  return (
    <Labelled
      id={id}
      label={label}
      errors={error}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
    >
      <div className={className}>
        <select
          id={id}
          name={name}
          value={value}
          defaultValue={PLACEHOLDER_VALUE}
          className={theme.input}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
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
  } else {
    return <option key={option.value} value={option.value}>{option.label}</option>;
  }
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
