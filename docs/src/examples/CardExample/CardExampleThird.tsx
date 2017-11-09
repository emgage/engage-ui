import * as React from 'react';
import { Card } from '../../../../src/components/';
import Section from '../../../../src/components/Card/Section';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
    <Card
      title="Online store dashboard"
      actions = {[{
        content: 'Edit Dashboard',
        onAction: () => { alert('Edit Content of Online Store Dashboard');},
      }]}
    >
      <Section>
        <p>View a summary of your online store’s performance.</p>
      </Section>
    </Card>
  </div>
);

export default CardExample;
