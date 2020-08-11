import * as React from 'react';
import { Labelled, helpTextID } from '../Labelled';
import type { RangeSliderProps } from '../../types';
export const CSS_VAR_PREFIX = 'RangeSlider';

export function clamp(number: number, min: number, max: number) {
  if (number < min) return min;
  if (number > max) return max;
  return number;
}

export interface SingleThumbProps extends RangeSliderProps {
  value: number;
  id: string;
  min: number;
  max: number;
  step: number;
}

// tslint:disable-next-line: function-name
export function SingleThumb(props: SingleThumbProps) {
  const {
    id,
    error,
    helpText,
    value,
    min,
    max,
    disabled,
    output,
    prefix,
    suffix,
    label,
    labelAction,
    labelHidden,
    step,
    onBlur,
    onFocus,
  } = props;
  const clampedValue = clamp(value, min, max);
  const describedBy: string[] = [];

  if (error) {
    describedBy.push(`${id}Error`);
  }

  if (helpText) {
    describedBy.push(helpTextID(id));
  }

  const ariaDescribedBy = describedBy.length
    ? describedBy.join(' ')
    : undefined;

  const sliderProgress = ((clampedValue - min) * 100) / (max - min);
  const outputFactor = invertNumber((sliderProgress - 50) / 100);

  const cssVars = {
    [`${CSS_VAR_PREFIX}min`]: min,
    [`${CSS_VAR_PREFIX}max`]: max,
    [`${CSS_VAR_PREFIX}current`]: clampedValue,
    [`${CSS_VAR_PREFIX}progress`]: `${sliderProgress}%`,
    [`${CSS_VAR_PREFIX}output-factor`]: `${outputFactor}`,
  };

  const outputMarkup = !disabled && output && (
    <output htmlFor={id} >
      <div >
        <span>{clampedValue}</span>
      </div>
    </output>
  );

  const prefixMarkup = prefix && <div>{prefix}</div>;

  const suffixMarkup = suffix && <div>{suffix}</div>;

  const className = '';

  return (
    <Labelled
      id={id}
      label={label}
      error={error}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
    >
      <div className={className} style={cssVars}>
        {prefixMarkup}
        <div>
          <input
            type="range"
            id={id}
            name={id}
            min={min}
            max={max}
            step={step}
            value={clampedValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={clampedValue}
            aria-invalid={Boolean(error)}
            aria-describedby={ariaDescribedBy}
          />
          {outputMarkup}
        </div>
        {suffixMarkup}
      </div>
    </Labelled>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = props;

    onChange && onChange(parseFloat(event.currentTarget.value), id);
  }

  function invertNumber(number: number) {
    if (Math.sign(number) === 1) {
      return -Math.abs(number);
    }  if (Math.sign(number) === -1) {
      return Math.abs(number);
    }
    return 0;

  }

}
