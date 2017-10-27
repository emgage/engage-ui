import * as React from 'react';
import CodeExample from '../CodeExample';

export interface IProps {
  exampleHeader?: string;
  exampleDescription?: string;
  exampleCode?: string;
  exampleComponent?: any;
}

// tslint:disable-next-line:variable-name
class Example extends React.Component<IProps, any> {
  render() {
    return (
      <div>
        <h3> { this.props.exampleHeader } </h3>
        { this.props.exampleDescription && <p>{ this.props.exampleDescription }</p> }
        { this.props.exampleComponent && <this.props.exampleComponent /> }
        { this.props.exampleCode && <CodeExample codeString= {this.props.exampleCode} /> }
      </div>
    );
  }
}

export default Example;
