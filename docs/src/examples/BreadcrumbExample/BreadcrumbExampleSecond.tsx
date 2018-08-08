import * as React from 'react';
import { BreadCrumb, BreadcrumbSourceData } from '../../../../src/components';
import * as styles from '../../styles/components-page.scss';

const breadcrumbData: BreadcrumbSourceData[] = [
  {
    name: 'Home',
    type: 'default',
    onBreadcrumbClick: () => {
      console.log('Home is clicked');
    }
  }, {
    name: 'Home1',
    type: 'active',
    onBreadcrumbClick: () => {
      console.log('Home1 is clicked');
    }
  }, {
    name: 'Home2',
    type: 'disabled'
  }, {
    name: 'Home3',
    type: 'active',
    onBreadcrumbClick: () => {
      console.log('Home3 is clicked');
    }
  },
];

class BreadcrumbExample extends React.Component {

  render() {
    return (
        <div className={styles.example}>
          <BreadCrumb direction="left" source={breadcrumbData} displayStyle="yellow" />
        </div>
    );
  }
}

export default BreadcrumbExample;
