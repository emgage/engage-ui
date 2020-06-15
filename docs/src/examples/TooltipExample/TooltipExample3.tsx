import * as React from 'react';
import { Tooltip, Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TooltipExample3 = () => (
  <div className={styles.example}>
    <div className={styles.example}>
      <Tooltip
        content="This order has shipping labels."
        preferredPosition="above"
        activatorWrapper="Test"
        active={false}
        light={false}
      >
        <Link external={false}>Order #1001</Link>
      </Tooltip>
    </div>
  </div>
);

export default TooltipExample3;
