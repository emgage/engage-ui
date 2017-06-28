import * as React from 'react';
import { getSelection, setSelection } from 'react-dom/lib/ReactInputSelection';
import InputMask from 'inputmask-core';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { Props as TextFieldProps } from '../TextField';
import { State } from '../TextField/TextField';
import TextField from '../TextField';
import { MASK_TEXT_FIELD } from '../ThemeIdentifiers';
import * as baseTheme from './MaskTextField.scss';

export interface Props extends TextFieldProps {
  mask?: string,
  formatCharacters?: any,
  placeholderChar?: string,
  size?: any,
  onPaste?(e: any): void,
  onKeyPress?(e: any): void,
  onKeyDown?(e: any): void,
  onEnter?(e: any): void,
}
const KEYCODE_Z = 90;
const KEYCODE_Y = 89;

function isUndo(e: any) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Y : KEYCODE_Z);
}

function isRedo(e: any) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Z : KEYCODE_Y);
}
class MaskTextField extends React.PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    value: '',
    onEnter: () => { },
  };
  public mask: any;
  public input: any;
  constructor(props: Props) {
    super(props);
    this.mask = '';
  }
  componentWillMount() {
    const options = {
      pattern: this.props.mask,
      value: this.props.value,
      placeholderChar: '',
      formatCharacters: this.props.formatCharacters,
    };
    if (this.props.placeholderChar) {
      options.placeholderChar = this.props.placeholderChar;
    }
    debugger;
    this.mask = new InputMask(options);
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.mask !== nextProps.mask && this.props.value !== nextProps.mask) {
      /**
       * if we get a new value and a new mask at the same time
       * check if the mask.value is still the initial value
       * - if so use the nextProps value
       * - otherwise the `this.mask` has a value for us (most likely from paste action)
       */
      if (this.mask.getValue() === this.mask.emptyValue) {
        this.mask.setPattern(nextProps.mask, { value: nextProps.value });
      } else {
        this.mask.setPattern(nextProps.mask, { value: this.mask.getRawValue() });
      }
    } else if (this.props.mask !== nextProps.mask) {
      this.mask.setPattern(nextProps.mask, { value: this.mask.getRawValue() });
    } else if (this.props.value !== nextProps.value) {
      this.mask.setValue(nextProps.value);
    }
  }

  componentWillUpdate(nextProps: any) {
    if (nextProps.mask !== this.props.mask) {
      this.updatePattern(nextProps);
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.mask !== this.props.mask && this.mask.selection.start) {
      this.updateInputSelection();
    }
  }

  onChange(e: any) {
    // console.log('onChange', JSON.stringify(getSelection(this.input)), e.target.value)

    const maskValue = this.mask.getValue();
    if (e.target.value !== maskValue) {
      // Cut or delete operations will have shortened the value
      if (e.target.value.length < maskValue.length) {
        const sizeDiff = maskValue.length - e.target.value.length;
        this.updateMaskSelection();
        this.mask.selection.end = this.mask.selection.start + sizeDiff;
        this.mask.backspace();
      }
      const value = this.getDisplayValue();
      e.target.value = value; // eslint-disable-line no-param-reassign
      if (value) {
        this.updateInputSelection();
      }
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onKeyDown(e: any) {
    if (e.key === 'Enter') {
      if (this.props.onEnter !== undefined) {
        this.props.onEnter(this.mask.getValue());
      }
    }

    // console.log('onKeyDown', JSON.stringify(getSelection(this.input)), e.key, e.target.value)
    if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') { e.preventDefault(); return; }

    if (isUndo(e)) {
      e.preventDefault();
      if (this.mask.undo()) {
        e.target.value = this.getDisplayValue(); // eslint-disable-line no-param-reassign
        this.updateInputSelection();
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
      return;
    } else if (isRedo(e)) {
      e.preventDefault();
      if (this.mask.redo()) {
        e.target.value = this.getDisplayValue(); // eslint-disable-line no-param-reassign
        this.updateInputSelection();
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      this.updateMaskSelection();
      if (this.mask.backspace()) {
        const value = this.getDisplayValue();
        e.target.value = value; // eslint-disable-line no-param-reassign
        if (value) {
          this.updateInputSelection();
        }
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
    }
  }

  onKeyPress(e: any) {
    // console.log('onKeyPress', JSON.stringify(getSelection(this.input)), e.key, e.target.value)

    if (e.key === 'Enter') {
      if (this.props.onEnter !== undefined) {
        this.props.onEnter(this.mask.getValue());
      }
    }

    // Ignore modified key presses
    // Ignore enter key to allow form submission
    if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') { e.preventDefault(); return; }

    e.preventDefault();
    this.updateMaskSelection();
    if (this.mask.input((e.key || e.data))) {
      e.target.value = this.mask.getValue(); // eslint-disable-line no-param-reassign
      this.updateInputSelection();
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  }

  onPaste(e: any) {
    e.preventDefault();
    this.updateMaskSelection();
    // getData value needed for IE also works in FF & Chrome
    if (this.mask.paste(e.clipboardData.getData('Text'))) {
      e.target.value = this.mask.getValue(); // eslint-disable-line no-param-reassign
      // Timeout needed for IE
      setTimeout(this.updateInputSelection, 0);
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  }

  getDisplayValue() {
    const value = this.mask.getValue();
    if (this.state.focused && (value === this.mask.emptyValue)) {
      setTimeout(
        () => {
          setSelection(this.input, { start: 0, end: 0 });
        },
        1,
      );
      return value;
    }
    return value === this.mask.emptyValue ? '' : value;
  }

  updatePattern(props: any) {
    this.mask.setPattern(props.mask, {
      value: this.mask.getRawValue(),
      selection: getSelection(this.input),
    });
  }

  updateMaskSelection() {
    this.mask.selection = getSelection(this.input);
  }

  updateInputSelection() {
    setSelection(this.input, this.mask.selection);
  }

  focus() {
    this.setState({
      focused: true,
    });
    this.input.focus();
    const { onFocus } = this.props;
    if (onFocus == null) { return; }
    onFocus();
  }

  blur() {
    this.setState({
      focused: false,
    });
    this.input.blur();
    const { onBlur } = this.props;
    if (onBlur == null) { return; }
    onBlur();
  }

  render() {
    const {
      mask,
      placeholderChar,
      formatCharacters,
      onPaste = this.onPaste,
      onKeyDown = this.onKeyDown,
      onKeyPress = this.onKeyPress,
      onChange = this.onChange,
      onBlur = this.blur,
      onFocus = this.focus,
      size = this.props.size || this.mask.pattern.length,
      ...otherProps,
    } = this.props;

    return (<TextField
      {...otherProps}
      ref={(r) => this.input = r}
      maxLength={this.mask.pattern.length}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={this.props.placeholder || this.mask.emptyValue}
      value={this.getDisplayValue()}
    />);
  }
}
export default themr(MASK_TEXT_FIELD, baseTheme)(MaskTextField) as ThemedComponentClass<Props, {}>;
