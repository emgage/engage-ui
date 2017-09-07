import * as React from 'react';
import { DisplayText } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class DisplayTextExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1. Default DisplayText:</h3>
        <br/>
        <DisplayText>
          Default DisplayText
        </DisplayText>
        <br/>
        <h3>2. DisplayText with element:</h3>
        <br/>
        <DisplayText
          element="h1"
        >
          DisplayText with element
        </DisplayText>
        <br/>
        <h3>3. DisplayText with element and size:</h3>
        <br/>
        <DisplayText
          element="h3"
          size="small"
        >
          DisplayText with element and size
        </DisplayText>
      </div>
    );
  }
}

export default DisplayTextExample;
