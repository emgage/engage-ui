import * as React from 'react';
import { Stack ,Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class StackExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1.Default Stack:</h3>
        <br/>
        <br/>
        <Stack>
          <Badge>Paid</Badge>
          <Badge>Fulfilled</Badge>
        </Stack>
        <br/>

        <h3>2.Stack with Spacing as tight:</h3>
        <br/>
        <Stack spacing="tight">
          <Badge>Paid</Badge>
          <Badge>Fulfilled</Badge>
        </Stack>
        <br/>

        <h3>3.Stack with Alignment as center:</h3>
        <br/>
        <br/>
        <Stack alignment="center">
          <Badge>Paid</Badge>
          <Badge>Fulfilled</Badge>
          <Badge>Test</Badge>
        </Stack>
        <br/>

        <h3>4.Stack with Distribution as equalSpacing:</h3>
        <br/>
        <br/>
        <Stack distribution="equalSpacing">
          <Badge>Paid</Badge>
          <Badge>Fulfilled</Badge>
        </Stack>
        <br/>

        <h3>5.Stack with Vertical option:</h3>
        <br/>
        <br/>
        <Stack vertical>
          <Badge>Paid</Badge>
          <Badge>Fulfilled</Badge>
        </Stack>
        <br/>
      </div>
    );
  }
}

export default StackExampleFirst;
