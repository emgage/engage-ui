import * as React from 'react';
import joinClasses from 'classnames';
import isFunction from '../utils/isFunction';
import KeyboardHandlerMixin from '../KeyboardHandlerMixin';
import SimpleTextEditor from './SimpleTextEditor';

// TODO: Add CSS require('../../../../themes/react-data-grid-core.css');
// TODO: Conversion Pending for Mixins and other TSLint errors.

export interface Props {
  rowIdx: number,
  rowData: any,
  value: any,
  cellMetaData: {
      selected: any,
      copied: any,
      dragged: any,
      onCellClick(): void,
      onCellDoubleClick(): void,
      onCommitCancel(): void,
      onCommit(): void,
  },
  column: any,
  height: number,
};

export interface State {
  isInvalid: boolean,
}

class EditorContainer extends React.Component<Props, State> {
  mixins: [KeyboardHandlerMixin];

  changeCommitted: false;
  changeCanceled: false;
  editor: any;

  getInitialState = () => {
    return {isInvalid: false};
  }

  componentDidMount() {
    let inputNode = this.getInputNode();
    if (inputNode !== undefined) {
      this.setTextInputFocus();
      if (!this.getEditor().disableContainerStyles) {
        inputNode.className += ' editor-main';
        inputNode.style.height = this.props.height - 1 + 'px';
      }
    }
  }

  componentWillUnmount() {
    if (!this.changeCommitted && !this.changeCanceled) {
      this.commit({key: 'Enter'});
    }
  }

  createEditor() {
    let editorRef = (c: any) => this.editor = c;
    let editorProps = {
      ref: editorRef,
      column: this.props.column,
      value: this.getInitialValue(),
      onCommit: this.commit,
      onCommitCancel: this.commitCancel,
      rowMetaData: this.getRowMetaData(),
      rowData: this.props.rowData,
      height: this.props.height,
      onBlur: this.commit,
      onOverrideKeyDown: this.onKeyDown,
    };

    let CustomEditor = this.props.column.editor;
    // return custom column editor or SimpleEditor if none specified
    if (React.isValidElement(CustomEditor)) {
      return React.cloneElement(CustomEditor, editorProps);
    }
    if (isFunction(CustomEditor)) {
      return <CustomEditor ref={editorRef} {...editorProps} />;
    }

    return <SimpleTextEditor ref={editorRef} column={this.props.column} value={this.getInitialValue()} onBlur={this.commit} rowMetaData={this.getRowMetaData()} onKeyDown={() => {}} commit={() => {}}/>;
  }

  onPressEnter() {
    this.commit({key: 'Enter'});
  }

  onPressTab() {
    this.commit({key: 'Tab'});
  }

  onPressEscape(e: SyntheticKeyboardEvent) {
    if (!this.editorIsSelectOpen()) {
      this.commitCancel();
    } else {
      // prevent event from bubbling if editor has results to select
      e.stopPropagation();
    }
  }

  onPressArrowDown(e: SyntheticKeyboardEvent) {
    if (this.editorHasResults()) {
      // dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  }

  onPressArrowUp(e: SyntheticKeyboardEvent) {
    if (this.editorHasResults()) {
      // dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  }

  onPressArrowLeft(e: SyntheticKeyboardEvent) {
    // prevent event propogation. this disables left cell navigation
    if (!this.isCaretAtBeginningOfInput()) {
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  }

  onPressArrowRight(e: SyntheticKeyboardEvent) {
    // prevent event propogation. this disables right cell navigation
    if (!this.isCaretAtEndOfInput()) {
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  }

  editorHasResults(): boolean {
    if (isFunction(this.getEditor().hasResults)) {
      return this.getEditor().hasResults();
    }

    return false;
  }

  editorIsSelectOpen() {
    if (isFunction(this.getEditor().isSelectOpen)) {
      return this.getEditor().isSelectOpen();
    }

    return false;
  }

  getRowMetaData(): any {
    // clone row data so editor cannot actually change this
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (typeof this.props.column.getRowMetaData === 'function') {
      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
    }
  }

  getEditor(): Editor {
    return this.editor;
  }

  getInputNode(): HTMLInputElement {
    return this.getEditor().getInputNode();
  }

  getInitialValue(): string {
    let selected = this.props.cellMetaData.selected;
    let keyCode = selected.initialKeyCode;
    if (keyCode === 'Delete' || keyCode === 'Backspace') {
      return '';
    } else if (keyCode === 'Enter') {
      return this.props.value;
    }

    let text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
    return text;
  }

  getContainerClass() {
    return joinClasses({
      'has-error': this.state.isInvalid === true,
    });
  }

  commit(args: {key : string}) {
    let opts = args || {};
    let updated = this.getEditor().getValue();
    if (this.isNewValueValid(updated)) {
      this.changeCommitted = true;
      let cellKey = this.props.column.key;
      this.props.cellMetaData.onCommit({cellKey: cellKey, rowIdx: this.props.rowIdx, updated: updated, key: opts.key});
    }
  }

  commitCancel() {
    this.changeCanceled = true;
    this.props.cellMetaData.onCommitCancel();
  }

  isNewValueValid(value: string): boolean {
    if (isFunction(this.getEditor().validate)) {
      let isValid = this.getEditor().validate(value);
      this.setState({isInvalid: !isValid});
      return isValid;
    }

    return true;
  }

  setCaretAtEndOfInput() {
    let input = this.getInputNode();
    // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
    let txtLength = input.value.length;
    if (input.setSelectionRange) {
      input.setSelectionRange(txtLength, txtLength);
    } else if (input.createTextRange) {
      let fieldRange = input.createTextRange();
      fieldRange.moveStart('character', txtLength);
      fieldRange.collapse();
      fieldRange.select();
    }
  }

  isCaretAtBeginningOfInput(): boolean {
    let inputNode = this.getInputNode();
    return inputNode.selectionStart === inputNode.selectionEnd
      && inputNode.selectionStart === 0;
  }

  isCaretAtEndOfInput(): boolean {
    let inputNode = this.getInputNode();
    return inputNode.selectionStart === inputNode.value.length;
  }

  isBodyClicked(e: any) {
    let relatedTarget = this.getRelatedTarget(e);
    return (relatedTarget === null);
  }

  isViewportClicked(e: any) {
    let relatedTarget = this.getRelatedTarget(e);
    return (relatedTarget.className.indexOf('react-grid-Viewport') > -1);
  }

  isClickInisdeEditor(e: any) {
    let relatedTarget = this.getRelatedTarget(e);
    return (e.currentTarget.contains(relatedTarget) || (relatedTarget.className.indexOf('editing') > -1 || relatedTarget.className.indexOf('react-grid-Cell') > -1));
  }

  getRelatedTarget(e: any) {
    return e.relatedTarget ||
            e.explicitOriginalTarget ||
            document.activeElement; // IE11
  }

  handleRightClick(e: Event) {
    e.stopPropagation();
  }

  handleBlur(e: Event) {
    e.stopPropagation();
    if (this.isBodyClicked(e)) {
      this.commit(e);
    }

    if (!this.isBodyClicked(e)) {
	    // prevent null reference
      if (this.isViewportClicked(e) || !this.isClickInisdeEditor(e)) {
        this.commit(e);
      }
    }
  }

  setTextInputFocus() {
    let selected = this.props.cellMetaData.selected;
    let keyCode = selected.initialKeyCode;
    let inputNode = this.getInputNode();
    inputNode.focus();
    if (inputNode.tagName === 'INPUT') {
      if (!this.isKeyPrintable(keyCode)) {
        inputNode.focus();
        inputNode.select();
      } else {
        inputNode.select();
      }
    }
  }

  renderStatusIcon() {
    if (this.state.isInvalid === true) {
      return <span className="glyphicon glyphicon-remove form-control-feedback"></span>;
    }
  }

  render() {
    return (
        <div className={this.getContainerClass()} onBlur={this.handleBlur} onKeyDown={this.onKeyDown} onContextMenu={this.handleRightClick}>
          {this.createEditor()}
          {this.renderStatusIcon()}
        </div>
      );
  }
};

export default EditorContainer;
