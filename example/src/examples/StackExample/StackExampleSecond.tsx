import * as React from 'react';
import { Stack , Badge ,Heading } from '../../../../src/components/';
import Item from '../../../../src/components/Stack/Item';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class StackExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>6.Stack with Single Item fills the remaining Space Example:</h3>
        <br/>
        <Stack >
          <Item fill>
            <Heading>Order #1136</Heading>
          </Item>
          <Item >
              <Badge>Paid</Badge>
          </Item>
          <Item >
              <Badge>Fulfilled</Badge>
          </Item>
        </Stack>
        <br/>
      </div>
    );
  }
}

export default StackExampleSecond;
