import * as React from 'react';
import { DualThumb, SingleThumb } from './components';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';

const getUniqueID = createUniqueIDFactory('RangeSlider');
export interface Props {
  label: string;
  labelAction?: any;
  labelHidden?: boolean;
  id?: string;
  value: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  output?: boolean;
  helpText?: React.ReactNode;
  error?: Error;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange(value: number | [number, number], id: string): void;
  onFocus?(): void;
  onBlur?(): void;
}

// tslint:disable-next-line: function-name
export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value= [5, 10],
  ...rest
}: Props) {
  const id = getUniqueID();

  const sharedProps = {
    id,
    min,
    max,
    step,
    ...rest,
  };

  return isDualThumb(value) ? (
    <DualThumb value={value} {...sharedProps} output/>
  ) : (
    <SingleThumb value={value} {...sharedProps} output />
  );
}

function isDualThumb(value: number | [number, number]): value is [number, number] {
  return Array.isArray(value);
}
