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


class CardFirstExample extends React.Component<IProps, IState> {
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
        <h3>1. Simple Card </h3>
        <Card title="Online store dashboard - Card" theme={theme}>
          <p>View a summary of your online store’s performance.</p>
        </Card>
        <h3> 2. Card with call to action in footer </h3>
        <Card  title="Online store dashboard"  primaryFooterAction={{ content: 'View Dashboard',onAction: () => { alert('View Dashboard Content of Online Store.'); } }}>
          <Section>
            <p>View a summary of your online store’s performance.</p>
          </Section>
        </Card>
        <h3> 3. Card with call to action in header </h3>
        <Card  title="Online store dashboard"  actions={[{ content: 'Edit Dashboard', onAction: () => { alert('Edit Content of Online Store Dashboard');} }] }>
          <Section>
            <p>View a summary of your online store’s performance.</p>
          </Section>
        </Card>
      </div>
    );
  }
}

export default CardFirstExample;
