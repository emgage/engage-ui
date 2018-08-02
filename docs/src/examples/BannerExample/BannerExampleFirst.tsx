import * as React from 'react';
import { Banner } from '../../../../src/components';
import * as styles from '../../styles/components-page.scss';

const BannerExample = () => (
  <div className={styles.example}>
    <Banner componentTitle="Order archived" ariaLabel="Order archived">
      <p>
        This order was archived.
      </p>
    </Banner>
  </div>
);

export default BannerExample;
