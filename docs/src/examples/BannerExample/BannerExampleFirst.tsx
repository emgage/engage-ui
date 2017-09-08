import * as React from 'react';
import { Banner, Link } from '../../../../src/components/';
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
        <h3>1. Default banner:</h3>
        <br/>
        <Banner title="Order archived">
          <p>
            This order was archived.
          </p>
        </Banner>
        <br/>
        <h3>2. Dismissible banner:</h3>
        <br/>
        <Banner
          onDismiss={() => {alert('Banner is dismissed.');}}
        >
          <p>
            Use your finance report.
            <Link url="http://www.google.com">
              Let us know what you think.
            </Link>
          </p>
        </Banner>
        <br/>
        <h3>3. Banner with footer call-to-action:</h3>
        <br/>
        <Banner
          title="Some of your product variants are missing weights"
         status="warning"
         action={{ content: 'Edit variant weights', onAction:() => {alert('You clicked on edit variant weights.');} }}
        >
          <p>
            Add weights to show accurate rates.
          </p>
        </Banner>
      </div>
    );
  }
}

export default BannerExample;
