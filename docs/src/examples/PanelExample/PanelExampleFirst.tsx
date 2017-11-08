import * as React from 'react';
import { Panel } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const PanelExampleFirst = () => (
  <div className={styles.example}>
    <Panel heading="Basic panel heading">
      <div>
        Basic panel children
      </div>
    </Panel>
  </div>
);

export default PanelExampleFirst;
