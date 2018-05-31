import * as React from 'react';
import { Card } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
    <Card
      customTitle="Staff accounts"
      sectioned
      subdued
    >
      <ul>
        <li>Stephen Hawking</li>
        <li>Jane Auston</li>
      </ul>
    </Card>
  </div>
);

export default CardExample;
