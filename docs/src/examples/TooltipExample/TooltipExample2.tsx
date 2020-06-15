import * as React from 'react';
import { Tooltip, Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TooltipExample2 = () => (
  <div className={styles.example}>
    <Tooltip content="This order has shipping labels." light active={false}>
      <Link external={false}>Order #1001</Link>
    </Tooltip>
  </div>
);

export default TooltipExample2;
