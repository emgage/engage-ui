import * as React from 'react';
import { Breadcrumb } from '../../../../src/components';
import { ISourceData } from '../../../../src/components/Breadcrumb/Breadcrumb';
import * as styles from '../../styles/components-page.scss';

const breadcrumbData: ISourceData[] = [
  {
    name: 'Home',
    type: 'default',
  }, {
    name: 'Home1',
    type: 'active'
  }, {
    name: 'Home2',
    type: 'disabled'
  }, {
    name: 'Home3',
    type: 'active'
  },
];

class BreadcrumbExample extends React.Component {

  BreadcrumbClick = () => {
    console.log('Breadcrumb clicked...');
  }

  render() {
    return (
        <div className={styles.example}>
          <Breadcrumb onBreadcrumbClick={this.BreadcrumbClick} direction={'right'} source={breadcrumbData} />
        </div>
    );
  }
}

export default BreadcrumbExample;

