import * as React from 'react';
import { Banner, Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const BannerExample = () =>  (
  <div className={styles.example}>
    <Banner
      customTitle="High risk of fraud detected"
      action={{ content: 'Review risk analysis', onAction:() => {alert('You clicked on Review risk analysis.');} }}
      status="critical"
    >
      <p>
        Before fulfilling this order or capturing payment, please
          <Link url="http://www.googl.com">
            Review the Risk Analysis
          </Link>
        and determine if this order is fraudulent.
      </p>
    </Banner>
  </div>
);

export default BannerExample;
