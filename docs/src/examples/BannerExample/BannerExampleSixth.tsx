import * as React from 'react';
import { Banner, Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const BannerExample = () =>  (
  <div className={styles.example}>
    <Banner
      onDismiss={() => { alert('Banner is dismissed.'); }}
      status="success"
    >
      <p>
        Use your finance report.
        <Link url="http://www.google.com" external={false}>
          Let us know what you think.
        </Link>
      </p>
    </Banner>
  </div>
);

export default BannerExample;
