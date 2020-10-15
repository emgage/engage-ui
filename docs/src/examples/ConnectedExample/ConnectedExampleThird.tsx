import * as React from 'react';
import { Connected, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ConnectedExample = () => (
  <div className={styles.example}>
    <Connected
      left= {
        <TextField type="text" label="TextField Left" value="Some value" />
      }
      right= {
        <TextField type="text" label="TextField Right" value="Some value" />
      }
    >
    </Connected>
  </div>
);

export default ConnectedExample;
