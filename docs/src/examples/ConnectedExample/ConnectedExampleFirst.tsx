import * as React from 'react';
import { Connected, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ConnectedExample = () => (
  <div className={styles.example}>
    <Connected
      left = {
        <TextField label="TextField Left" value="Some value" />
      }
    >
    </Connected>
  </div>
);

export default ConnectedExample;
