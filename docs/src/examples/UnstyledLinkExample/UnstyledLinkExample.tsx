import * as React from 'react';
import { UnstyledLink } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const UnstyliedLinkExample = () => (
  <div className={styles.example}>
    <br />
    <UnstyledLink
      url="https://emgage.com/"
      children="child"
    />
  </div>
);

export default UnstyliedLinkExample;
