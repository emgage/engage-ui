import * as React from 'react';
import { Spinner } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const SpinnerExample = () => (
    <div className={styles.example}>
        <Spinner componentSize="small" componentColor="disabled" />
    </div>
);

export default SpinnerExample;
