import * as React from 'react';
import { Icon } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const IconExampleThird = () => (
    <div className={styles.example}>
        <Icon
          source="notes"
          color="black"
          backdrop
          accessibilityLabel="This is an icon"
        />
    </div>
);

export default IconExampleThird;
