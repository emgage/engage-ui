import * as React from 'react';
import { UnstyledLink } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const UnstyliedLinkExample1 = () => (
  <div className={styles.example}>
    <br />
    <UnstyledLink
      external url="https://emgage.com/"
      key="test"
      children="child"
    />
  </div>
);

export default UnstyliedLinkExample1;
