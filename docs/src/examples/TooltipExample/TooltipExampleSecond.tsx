import * as React from 'react';
import { Tooltip , Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class TooltipExampleSecond extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>4.Tooltip with preferredPosition and activatorWrapper property:</h3>
        <Tooltip
          content="This order has shipping labels."
          preferredPosition="above"
          activatorWrapper="Test">
          <Link>Order #1001</Link>
        </Tooltip>
      </div>
    );
  }
}

export default TooltipExampleSecond;
