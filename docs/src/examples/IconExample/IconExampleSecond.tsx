import * as React from 'react';
import { Icon } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const IconExampleSecond = () => (
  <div className={styles.example}>
      <Icon
          source="notes"
          componentColor="black"
          backdrop
          accessibilityLabel="This is an icon"
        />
  </div>
);

export default IconExampleSecond;
