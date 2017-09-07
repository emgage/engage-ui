import * as React from 'react';
import { Message, Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  isvisibled: boolean;
}

class MessageExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isvisibled: false,
    };
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1. Show message when isVisible=true:</h3>
        <br/>
        <Message
          id = "1010101010"
          isVisible
        >
          Test message
        </Message>
        <br/>
        <h3>2. Show message by clicking button:</h3>
        <br/>
        <Message
          id = "1010101010"
          isVisible = {this.state.isvisibled}
        >
          This is your message
        </Message>
        <Button
          onClick={() => this.setState({ isvisibled: !this.state.isvisibled })}
        >
          View / Hide Message
        </Button>
        <br/>
      </div>
    );
  }
}

export default MessageExample;
