import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleThird = () => (
    <div className={styles.example}>
        <RadioButton
            customName="size"
            label="Large"
            checked customId="Radioid"
            customValue="Large"
            disabled
            labelHidden
        />
        <RadioButton
            customName="size"
            label="Medium"
            disabled
            labelHidden
        />
        <RadioButton
            customName="size"
            label="Small"
            disabled
            labelHidden
        />
    </div>
);

export default RadioButtonExampleThird;
