import * as React from 'react';
import { UnstyledLink } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class UnstyliedLinkExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        UnstyledLink with children prop:
        <br/>
        <UnstyledLink
          url="https://emgage.com/"
          children="child"
        />
      </div>
    );
  }
}

export default UnstyliedLinkExampleFirst;
