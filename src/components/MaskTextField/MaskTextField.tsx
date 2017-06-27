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
  maskValue?: string,
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
    let txtValue = '';
    let txtFormatValue = '';
    if (maskValue != null) {
      txtValue = maskValue;
    } else {
      switch (mask) {
        case 'card':
          txtValue = '99-099-9999-9999';
          txtFormatValue = '__-___-____-____';
          break;
        case 'email':
          txtValue = '99-099-9999';
          txtFormatValue = '__-___-____';
          break;
        case 'phone':
          txtValue = '99-099-9999';
          txtFormatValue = '__-___-____';
          break;
        default:
          txtValue = '';
          txtFormatValue = '';
          break;
      }
    }
    const KEYCODE_Z = 90;
    let KEYCODE_Y = 89;

    function isUndo(e: any) {
      return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Y : KEYCODE_Z)
    }

    function isRedo(e: any) {
      return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Z : KEYCODE_Y)
    }

    function getSelection(el: any) {
      var start, end, rangeEl, clone

      if (el.selectionStart !== undefined) {
        start = el.selectionStart;
        end = el.selectionEnd;
      }
      else {
        try {
          el.focus();
          rangeEl = el.createTextRange();
          clone = rangeEl.duplicate();

          rangeEl.moveToBookmark(document.selection.createRange().getBookmark());
          clone.setEndPoint('EndToStart', rangeEl);

          start = clone.text.length;
          end = start + rangeEl.text.length;
        }
        catch (e) { /* not focused or not visible */ }
      }

      return { start, end };
    }

    function setSelection(el: any, selection: any) {
      let rangeEl;

      try {
        if (el.selectionStart !== undefined) {
          el.focus();
          el.setSelectionRange(selection.start, selection.end);
        }
        else {
          el.focus();
          rangeEl = el.createTextRange();
          rangeEl.collapse(true);
          rangeEl.moveStart('character', selection.start);
          rangeEl.moveEnd('character', selection.end - selection.start);
          rangeEl.select();
        }
      }
      catch (e) { /* not focused or not visible */ }
    }
    return (
      <TextField
        placeholder={txtValue}
        value={txtValue}
        {...rest} />
    );
  }
}
export default themr(MASK_TEXT_FIELD, baseTheme)(MaskTextField) as ThemedComponentClass<Props, {}>;
