import * as React from 'react';
import { Banner, List, Item } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const BannerExample = () =>  (
  <div className={styles.example}>
    <Banner
      componentTitle="Before you can purchase a shipping label, this change needs to be made:"
      action={{ content: 'Edit address', onAction:() => { alert('You clicked on Edit address.'); } }}
       status="warning"
    >
      <List>
        <Item>
          The name of the city is Newyork.
        </Item>
      </List>
    </Banner>
  </div>
);

export default BannerExample;
