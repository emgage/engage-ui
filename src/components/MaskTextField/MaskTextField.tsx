import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { Props as TextFieldProps } from '../TextField';
import { State as TextFieldState } from '../TextField/TextField';
// tslint:disable-next-line
import TextField from '../TextField';
import { MASK_TEXT_FIELD } from '../ThemeIdentifiers';
import { IMaskOption, IBackSpace } from './IMaskInterface';
import parseMask from './parseMask';
import { isAndroidBrowser, isWindowsPhoneBrowser, isAndroidFirefox } from './environment';
import {
  clearRange,
  formatValue,
  getFilledLength,
  isFilled,
  isEmpty,
  isPermanentChar,
  getInsertStringLength,
  insertString,
} from './string';
import defer from './defer';
import * as baseTheme from './MaskTextField.scss';

export interface State extends TextFieldState {
  value?: string;
}
export interface Props extends TextFieldProps {
  [key: string]: any;
  // String formatted data to be mask.
  mask?: string;
  // Defines format characters with characters as a keys and corresponding RegExp strings as a values. 
  formatChars?: any;
  // Character to cover unfilled parts of the mask.
  maskChar?: string;
  // default mask
  defaultValue?: string;
  // Show mask when input is empty and has no focus
  alwaysShowMask?: boolean;
  // Callback when paste data into textfield
  onPaste?(e: any): void;
  // Callback when keypress in textfield
  onKeyPress?(e: any): void;
  onKeyDown?(e: any): void;
  // Callback when enter is pressed from masked textfield
  onEnter?(e: any): void;
}
class MaskTextField extends React.PureComponent<Props, State> {
  [key: string]: any;
  lastCursorPos: number;
  hasValue = false;
  maskOptions: IMaskOption;
  isAndroidBrowser: boolean;
  isWindowsPhoneBrowser: boolean;
  isAndroidFirefox: boolean;
  backspaceOrDeleteRemoval?: IBackSpace;
  input: any;
  paste: any;
  constructor(props: any) {
    super(props);
    const { mask, maskChar, formatChars, alwaysShowMask = false } = props;
    let { defaultValue, value } = props;
    this.hasValue = value != null;
    this.maskOptions = parseMask(mask, maskChar, formatChars);
    if (defaultValue == null) {
      defaultValue = '';
    }
    if (value == null) {
      value = defaultValue;
    }
    value = this.getStringValue(value);
    if (this.maskOptions.mask && (alwaysShowMask || value)) {
      value = formatValue(this.maskOptions, value);
    }
    this.state = {
      value,
    };
  }
  componentDidMount() {
    this.isAndroidBrowser = isAndroidBrowser();
    this.isWindowsPhoneBrowser = isWindowsPhoneBrowser();
    this.isAndroidFirefox = isAndroidFirefox();
    if (this.getInputValue() !== this.state.value) {
      this.setInputValue(this.state.value);
    }
  }
  componentWillReceiveProps(nextProps: any) {
    const oldMaskOptions = this.maskOptions;
    this.hasValue = nextProps.value != null;
    this.maskOptions = parseMask(nextProps.mask, nextProps.maskChar, nextProps.formatChars);
    if (!this.maskOptions.mask) {
      this.lastCursorPos = 0;
      return;
    }
    const isMaskChanged = this.maskOptions.mask && this.maskOptions.mask !== oldMaskOptions.mask;
    const { alwaysShowMask = false } = nextProps;
    const showEmpty = alwaysShowMask || this.isFocused();
    let newValue = this.hasValue
      ? this.getStringValue(nextProps.value)
      : this.state.value;
    if (!oldMaskOptions.mask && !this.hasValue) {
      newValue = this.getInputDOMNode().value;
    }
    if (isMaskChanged || (this.maskOptions.mask && (newValue || showEmpty))) {
      newValue = formatValue(this.maskOptions, newValue);
      if (isMaskChanged) {
        let pos = this.lastCursorPos;
        const filledLen = getFilledLength(this.maskOptions, newValue);
        if (pos === null || filledLen < pos) {
          if (isFilled(this.maskOptions, newValue)) {
            pos = filledLen;
          } else {
            pos = this.getRightEditablePos(filledLen);
          }
          this.setCursorPos(pos);
        }
      }
    }
    if (this.maskOptions.mask && isEmpty(this.maskOptions, newValue) && !showEmpty && (!this.hasValue || !nextProps.value)) {
      newValue = '';
    }
    this.setState({ ['value']: newValue });
  }
  componentDidUpdate() {
    if (this.getInputValue() !== this.state.value) {
      this.setInputValue(this.state.value);
    }
  }
  getInputDOMNode = () => {
    const input = this.input;
    if (!input) {
      return null;
    }
    return this.input._reactInternalInstance._renderedComponent._instance.input;
  }

  getInputValue = () => {
    const input = this.getInputDOMNode();
    if (!input) {
      return null;
    }
    return input.value;
  }
  setInputValue = (value: any) => {
    const input = this.getInputDOMNode();
    if (!input) {
      return;
    }
    this.setState({ ['value']: value });
  }
  getLeftEditablePos = (pos: any) => {
    for (let i = pos; i >= 0; --i) {
      if (!isPermanentChar(this.maskOptions, i)) {
        return i;
      }
    }
    return null;
  }
  getRightEditablePos = (pos: any) => {
    const { mask } = this.maskOptions;
    for (let i = pos; i < mask.length; ++i) {
      if (!isPermanentChar(this.maskOptions, i)) {
        return i;
      }
    }
    return null;
  }
  setCursorToEnd = () => {
    const filledLen = getFilledLength(this.maskOptions, this.state.value);
    const pos = this.getRightEditablePos(filledLen);
    if (pos !== null) {
      this.setCursorPos(pos);
    }
  }
  setSelection = (start: any, len = 0) => {
    const input = this.getInputDOMNode();
    if (!input) {
      return;
    }
    const end = start + len;
    if ('selectionStart' in input && 'selectionEnd' in input) {
      input.selectionStart = start;
      input.selectionEnd = end;
    } else {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    }
  }
  getSelection = () => {
    const input = this.getInputDOMNode();
    let start = 0;
    let end = 0;
    if ('selectionStart' in input && 'selectionEnd' in input) {
      start = input.selectionStart;
      end = input.selectionEnd;
    }
    return {
      start,
      end,
      length: end - start,
    };
  }
  getCursorPos = () => {
    return this.getSelection().start;
  }
  setCursorPos = (pos: any) => {
    this.setSelection(pos, 0);
    defer(() => {
      this.setSelection(pos, 0);
    });
    this.lastCursorPos = pos;
  }
  isFocused = () => {
    return document.activeElement === this.getInputDOMNode();
  }
  getStringValue = (value: any) => {
    return !value && value !== 0 ? '' : value + '';
  }
  onKeyDown = (event: any) => {
    this.backspaceOrDeleteRemoval = undefined;
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }
    const { key, ctrlKey, metaKey, defaultPrevented } = event;
    if (ctrlKey || metaKey || defaultPrevented) {
      return;
    }
    if (key === 'Backspace' || key === 'Delete') {
      this.backspaceOrDeleteRemoval = {
        key,
        selection: this.getSelection(),
      };
      defer(() => {
        this.backspaceOrDeleteRemoval = undefined;
      });
    }
  }
  onChange = (event: any) => {
    const { paste } = this;
    const { mask, maskChar, lastEditablePos, prefix } = this.maskOptions;
    let value = this.getInputValue();
    const oldValue = this.state.value === undefined ? '' : this.state.value;
    if (paste) {
      this.paste = null;
      this.pasteText(paste.value, value, paste.selection, event);
      return;
    }
    let selection = this.getSelection();
    let cursorPos = selection.end;
    const maskLen = mask.length;
    const valueLen = value.length;
    const oldValueLen = oldValue.length;
    let clearedValue;
    let enteredString;
    if (this.backspaceOrDeleteRemoval) {
      const deleteFromRight = this.backspaceOrDeleteRemoval.key === 'Delete';
      value = this.state.value;
      selection = this.backspaceOrDeleteRemoval.selection;
      cursorPos = selection.start;
      this.backspaceOrDeleteRemoval = undefined;
      if (selection.length) {
        value = clearRange(this.maskOptions, value, selection.start, selection.length);
      } else if (selection.start < prefix.length || (!deleteFromRight && selection.start === prefix.length)) {
        cursorPos = prefix.length;
      } else {
        const editablePos = deleteFromRight
          ? this.getRightEditablePos(cursorPos)
          : this.getLeftEditablePos(cursorPos - 1);
        if (editablePos !== null) {
          value = clearRange(this.maskOptions, value, editablePos, 1);
          cursorPos = editablePos;
        }
      }
    } else if (valueLen > oldValueLen) {
      const enteredStringLen = valueLen - oldValueLen;
      const startPos = selection.end - enteredStringLen;
      enteredString = value.substr(startPos, enteredStringLen);
      if (startPos < lastEditablePos && (enteredStringLen !== 1 || enteredString !== mask[startPos])) {
        cursorPos = this.getRightEditablePos(startPos);
      } else {
        cursorPos = startPos;
      }
      value = value.substr(0, startPos) + value.substr(startPos + enteredStringLen);
      clearedValue = clearRange(this.maskOptions, value, startPos, maskLen - startPos);
      clearedValue = insertString(this.maskOptions, clearedValue, enteredString, cursorPos);
      value = insertString(this.maskOptions, oldValue, enteredString, cursorPos);
      if (enteredStringLen !== 1 || (cursorPos >= prefix.length && cursorPos < lastEditablePos)) {
        cursorPos = Math.max(getFilledLength(this.maskOptions, clearedValue), cursorPos);
        if (cursorPos < lastEditablePos) {
          cursorPos = this.getRightEditablePos(cursorPos);
        }
      } else if (cursorPos < lastEditablePos) {
        cursorPos++;
      }
    } else if (valueLen < oldValueLen) {
      const removedLen = maskLen - valueLen;
      enteredString = value.substr(0, selection.end);
      const clearOnly = enteredString === oldValue.substr(0, selection.end);
      clearedValue = clearRange(this.maskOptions, oldValue, selection.end, removedLen);
      if (maskChar) {
        value = insertString(this.maskOptions, clearedValue, enteredString, 0);
      }
      clearedValue = clearRange(this.maskOptions, clearedValue, selection.end, maskLen - selection.end);
      clearedValue = insertString(this.maskOptions, clearedValue, enteredString, 0);
      if (!clearOnly) {
        cursorPos = Math.max(getFilledLength(this.maskOptions, clearedValue), cursorPos);
        if (cursorPos < lastEditablePos) {
          cursorPos = this.getRightEditablePos(cursorPos);
        }
      } else if (cursorPos < prefix.length) {
        cursorPos = prefix.length;
      }
    }
    value = formatValue(this.maskOptions, value);
    this.setInputValue(value);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
    if (this.isWindowsPhoneBrowser) {
      defer(() => {
        this.setSelection(cursorPos, 0);
      });
    } else {
      this.setCursorPos(cursorPos);
    }
  }
  onFocus = (event: any) => {
    if (!this.state.value) {
      const prefix = this.maskOptions.prefix;
      const value = formatValue(this.maskOptions, prefix);
      const inputValue = formatValue(this.maskOptions, value);
      const isInputValueChanged = inputValue !== event.target.value;
      if (isInputValueChanged) {
        event.target.value = inputValue;
      }
      this.setState({ ['value']: inputValue });
      if (isInputValueChanged && typeof this.props.onChange === 'function') {
        this.props.onChange(event.target.value);
      }
      this.setCursorToEnd();
    } else if (getFilledLength(this.maskOptions, this.state.value) < this.maskOptions.mask.length) {
      this.setCursorToEnd();
    }
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event);
    }
  }
  onBlur = (event: any) => {
    const { alwaysShowMask = false } = this.props;
    if (!alwaysShowMask && isEmpty(this.maskOptions, this.state.value)) {
      const inputValue = '';
      const isInputValueChanged = inputValue !== this.getInputValue();
      if (isInputValueChanged) {
        this.setInputValue(inputValue);
      }
      if (isInputValueChanged && typeof this.props.onChange === 'function') {
        this.props.onChange(event);
      }
    }
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event);
    }
  }
  onPaste = (event: any) => {
    if (typeof this.props.onPaste === 'function') {
      this.props.onPaste(event);
    }
    if (this.isAndroidBrowser && !event.defaultPrevented) {
      this.paste = {
        value: this.getInputValue(),
        selection: this.getSelection(),
      };
      this.setInputValue('');
    }
  }
  pasteText = (incValue: any, text: any, selection: any, event: any) => {
    let cursorPos = selection.start;
    let value = incValue;
    if (selection.length) {
      value = clearRange(this.maskOptions, value, cursorPos, selection.length);
    }
    const textLen = getInsertStringLength(this.maskOptions, value, text, cursorPos);
    value = insertString(this.maskOptions, value, text, cursorPos);
    cursorPos += textLen;
    cursorPos = this.getRightEditablePos(cursorPos) || cursorPos;
    if (value !== this.getInputValue()) {
      this.setInputValue(value);
      if (event && typeof this.props.onChange === 'function') {
        this.props.onChange(event);
      }
    }
    this.setCursorPos(cursorPos);
  }
  render() {
    const {
      mask,
      alwaysShowMask = false,
      maskChar,
      formatChars,
      theme,
      ...props
    } = this.props;
    let copyProps;
    if (this.maskOptions.mask) {
      if (!props.disabled && !props.readOnly) {
        const handlersKeys = ['onFocus', 'onBlur', 'onChange', 'onKeyDown', 'onPaste'];
        copyProps = handlersKeys.reduce(
          (currObj, key) => {
            return {
              ...currObj,
              [key]: this[key],
            };
          },
          { ...props });
      }
    }
    const passProps = copyProps ? copyProps : props;
    return <TextField value={this.state.value} ref={(ref: React.PureComponent<TextFieldProps>) => this.input = ref} {...passProps} theme={theme} />;
  }
}
export default themr(MASK_TEXT_FIELD, baseTheme)(MaskTextField) as ThemedComponentClass<Props, State>;
