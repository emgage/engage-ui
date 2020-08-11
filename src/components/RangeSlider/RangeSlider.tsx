import * as React from 'react';
import { DualThumb, SingleThumb } from './components';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { RangeSliderProps, RangeSliderValue, DualValue } from './types';

const getUniqueID = createUniqueIDFactory('RangeSlider');
interface Props extends RangeSliderProps {}

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

function isDualThumb(value: RangeSliderValue): value is DualValue {
  return Array.isArray(value);
}
