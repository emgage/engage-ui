import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { createUniqueIDFactory } from '@shopify/javascript-utilities/other';
import { Props as TextFiledProps } from '../TextField';
import TextField from '../TextField';
import { MASK_TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './MaskTextField.scss';

export type Type = 'card' | 'email' | 'phone' | 'custom' | 'date';

export interface Props extends TextFiledProps {
  mask: Type,
  maskValue: string,
}

const getUniqueID = createUniqueIDFactory('TextField');

class MaskTextField extends React.PureComponent<Props, {}> {

  render() {
    const {
      id = getUniqueID(),
      mask,
      maskValue,
      ...rest,
    } = this.props;
    return (
      <TextField
        placeholder={maskValue}
        {...rest} />
    );
  }
}

export default themr(MASK_TEXT_FIELD, baseTheme)(MaskTextField) as ThemedComponentClass<Props, {}>;
