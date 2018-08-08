import * as React from 'react';
import { Banner } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const BannerExample = () =>  (
  <div className={styles.example}>
    <Banner
      componentTitle="Some of your product variants are missing weights"
      status="warning"
      action={{ content: 'Edit variant weights', onAction:() => { alert('You clicked on edit variant weights.'); } }}
    >
      <p>
        Add weights to show accurate rates.
      </p>
    </Banner>
  </div>
);

export default BannerExample;
