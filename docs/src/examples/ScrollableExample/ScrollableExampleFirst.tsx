import * as React from 'react';
import { Scrollable } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ScrollableExampleFirst = () => (
  <div className={styles.example}>
    <Scrollable>
      <p>
        By signing up for the Shopify service (“Service”) or
        any of the services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
        the following terms and conditions (“Terms of Service”). The Services offered by Shopify
        under the Terms of Service include various products and services to help you create and manage
        a retail store, whether an online store (“Online Services”), a physical retail store
        (“POS Services”), or both. Any new features or tools which are added to the current Service
        shall be also subject to the Terms of Service. You can review the current version of the Terms of
        Service at any time at https://www.shopify.com/legal/terms.
      </p>
    </Scrollable>
  </div>
);

export default ScrollableExampleFirst;
