import * as React from 'react';
import { Banner } from '../../../../src/components';
import * as styles from '../../styles/components-page.scss';

const BannerExample = () => (
  <div className={styles.example}>
    <Banner
      componentTitle="Your shipping label is ready to print."
      status="success"
      action={{ content: 'Print label', onAction:() => { alert('You clicked on Print label.'); } }}
    />
  </div>
);

export default BannerExample;
