import * as React from 'react';
import { SideNavigation, FormLayout } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface Props {
  accordian: boolean;
  url: string;
}

export interface State {
   
}

class SideNavigationExampleFirst extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <FormLayout>
            <SideNavigation accordian={false} url="http://localhost:8081//src/components/SideNavigation/sideNavData.json" />
        </FormLayout>
      </div>
    );
  }
}

export default SideNavigationExampleFirst;
