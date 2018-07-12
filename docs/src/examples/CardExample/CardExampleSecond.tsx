import * as React from 'react';
import { Card } from '../../../../src/components/';
import Section from '../../../../src/components/Card/Section';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
    <Card
      componentTitle="Online store dashboard"
      primaryFooterAction = {{
        content: 'View Dashboard',
        onAction: () => { alert('View Dashboard Content of Online Store.'); },
      }}
    >
      <Section>
        <p>View a summary of your online store’s performance.</p>
      </Section>
    </Card>
  </div>
);

export default CardExample;
