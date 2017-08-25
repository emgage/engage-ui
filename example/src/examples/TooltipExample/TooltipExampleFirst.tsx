import * as React from 'react';
import { Tooltip ,Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class TooltipExampleFirst extends React.Component<IProps, IState> {
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
        <h3>1.Default Tooltip:</h3>
        <Tooltip content="This order has shipping labels.">
          <Link>Order #1001</Link>
        </Tooltip>

        <h3>2.Tooltip with active property:</h3>
        <Tooltip content="This order has shipping labels." active={false}>
            <Link>Order #1001</Link>
        </Tooltip>

        <h3>3.Tooltip with light property:</h3>
        <Tooltip content="This order has shipping labels." light>
            <Link>Order #1001</Link>
        </Tooltip>
      </div>
    );
  }
}

export default TooltipExampleFirst;
