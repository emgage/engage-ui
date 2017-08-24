import * as React from 'react';
import { Card } from '../../../../src/components/';
import Section from '../../../../src/components/Card/Section';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState { 
}

const theme = {
  Card: 'Card',
  subdued: 'subdued',
  Header: 'Header',
  Section: 'Section',
  SectionHeader: 'SectionHeader',
  Footer: 'Footer',
};

class CardSecondExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
  
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3> 4. Card with multiple sections </h3>
        <Card title="Online store dashboard">
          <Section title="Reports">
            <p>View a summary of your online store’s performance.</p>
          </Section>
          <Section title="Summary">
            <p>View a summary of your online store’s performance, including sales, visitors, top products, and referrals.</p>
          </Section>
        </Card>
        <h3> 5. Card with actions in header and primary and secondary actions in footer: </h3>        
        <Card 
          title="Staff accounts" 
          sectioned 
          subdued 
          theme={theme} 
          actions={[{ content: 'Edit Account', onAction: () => { alert('Edit Staff Accounts');} }]}
          primaryFooterAction ={{ content: 'Save', onAction: () => { alert('Save edited Staff Accounts');} }}
          secondaryFooterAction ={{ content: 'Cancel', onAction: () => { alert('Cancel edit Staff Accounts');} }}
          >
          <Section>
            <ul>
              <li>Willian Shakespeare</li>
              <li>David Bowie</li>
            </ul>
          </Section>
          <Section
            subdued
            title="Deactivated staff accounts"
          >
            <ul>
              <li>Stephen Hawking</li>
              <li>Jane Auston</li>
            </ul>
          </Section>
        </Card>
      </div>
    );
  }
}

export default CardSecondExample;
