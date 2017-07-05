import * as React from 'react';
import EditorBase from './EditorBase';

class SimpleTextEditor extends EditorBase {
  private input: HTMLInputElement | null;

  render() {
    return (
      <input ref={(node) => this.input = node} type="text" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} />
    );
  }
};

export default SimpleTextEditor;
