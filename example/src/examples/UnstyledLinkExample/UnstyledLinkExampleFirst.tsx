import * as React from 'react';
import { UnstyledLink } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class UnstyliedLinkExampleFirst extends React.Component<IProps> {
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
                UnstyledLink with children prop:
                <br/>
                <UnstyledLink url="https://shopify.com" children="child"/>
                <br/>
            </div>
    );
  }
}

export default UnstyliedLinkExampleFirst;
