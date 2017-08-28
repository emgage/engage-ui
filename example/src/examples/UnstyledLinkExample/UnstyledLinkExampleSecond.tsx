import * as React from 'react';
import { UnstyledLink } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class UnstyliedLinkExampleSecond extends React.Component<IProps> {
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
                UnstyledLink  with external and key prop:
                <br/>
                <UnstyledLink external url="https://shopify.com" key="test" children="child"/>
            </div>
    );
  }
}

export default UnstyliedLinkExampleSecond;
