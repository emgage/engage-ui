import * as React from 'react';
import { Spinner } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const SpinnerExample = () => (
    <div className={styles.example}>
        <Spinner customSize="small" customColor="inkLightest" />
    </div>
);

export default SpinnerExample;
