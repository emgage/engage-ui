import * as React from 'react';
import { Message, Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
  isvisibled: boolean;
}

class MessageExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isvisibled: false,
    };
  }

  render() {
    return (
      <div className={styles.example}>
        <Message
          id = "1010101010"
          isVisible = {this.state.isvisibled}
        >
          This is your message
        </Message>
        <Button onClick={() => this.setState({ isvisibled: !this.state.isvisibled })} >
          Show/Hide Message
        </Button>
        <br/>
      </div>
    );
  }
}

export default MessageExampleSecond;
