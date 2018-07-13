import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleThird = () => (
    <div className={styles.example}>
        <RadioButton
            name="size"
            label="Large"
            checked componentId="Radioid"
            value="Large"
            disabled
            labelHidden
        />
        <RadioButton
            name="size"
            label="Medium"
            disabled
            labelHidden
        />
        <RadioButton
            name="size"
            label="Small"
            disabled
            labelHidden
        />
    </div>
);

export default RadioButtonExampleThird;
