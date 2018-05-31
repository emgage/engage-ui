import * as React from 'react';
import { Banner } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const BannerExample = () => (
  <div className={styles.example}>
    <Banner
      customTitle="USPS has updated their rates"
      action={{ content: 'Learn more', onAction:() => {alert('You clicked on Learn more.');} }}
      status="info"
    >
      <p>
        Make sure you know how these changes affect your store.
      </p>
    </Banner>
  </div>
);

export default BannerExample;
