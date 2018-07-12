import * as React from 'react';
import { DescriptionList, Term, Description } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const DescriptionListExampleThird = () => (
  <div className={styles.example}>
    <DescriptionList componentType="divider" componentStyle="Stacked">
        <Term>Logistics</Term>
        <Description>The management of products or other resources as they travel between a point of origin and a destination.</Description>
        <Term>Sole proprietorship</Term>
        <Description>A business structure where a single individual both owns and runs the company.</Description>
        <Term>Discount code</Term>
        <Description>A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.</Description>
    </DescriptionList>
  </div>
);

export default DescriptionListExampleThird;
