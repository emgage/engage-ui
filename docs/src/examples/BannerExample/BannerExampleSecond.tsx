import * as React from 'react';
import { Banner, Link, List, Item } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class BannerExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>4. Informational banner:</h3>
        <br/>
        <Banner
          title="USPS has updated their rates"
          action={{ content: 'Learn more', onAction:() => {alert('You clicked on Learn more.');} }}
          status="info"
        >
          <p>
            Make sure you know how these changes affect your store.
          </p>
        </Banner>
        <br/>
        <h3>5. Success banner:</h3>
        <br/>
        <Banner
          title="Your shipping label is ready to print."
          status="success"
          action={{ content: 'Print label', onAction:() => {alert('You clicked on Print label.');} }}
        />
        <br/>
        <h3>6. Warning banner:</h3>
        <br/>
        <Banner
          title="Before you can purchase a shipping label, this change needs to be made:"
          action={{ content: 'Edit address', onAction:() => {alert('You clicked on Edit address.');} }}
          status="warning"
        >
          <List>
            <Item>
              The name of the city is Newyork.
            </Item>
          </List>
        </Banner>
        <br/>
        <h3>7. Critical banner:</h3>
        <br/>
        <Banner
          title="High risk of fraud detected"
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
  }
}

export default BannerExample;
