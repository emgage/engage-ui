import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ExcelColumnShape from '../PropTypeShapes/ExcelColumn';

interface Object { [key: string]: any, }

export interface Props {
  column: ExcelColumnShape,
  value: any,
  onKeyDown(): void,
  onBlur(): void,
  commit(): void,
  rowMetaData(): void,
};

class EditorBase extends React.Component<Props, any> {

  getStyle(): {width: string} {
    return {
      width: '100%',
    };
  }

  getValue(): any {
    let updated: Object = {};
    updated[this.props.column.key] = this.getInputNode().nodeValue;
    return updated;
  }

  getInputNode(): Element {
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode.tagName === 'INPUT') {
      return domNode;
    }

    return domNode.querySelector('input:not([type=hidden])') as Element;
  }

  inheritContainerStyles(): boolean {
    return true;
  }
}

export default EditorBase;
