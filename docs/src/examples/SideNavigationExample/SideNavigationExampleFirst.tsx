import * as React from 'react';
import { SideNavigation, FormLayout } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';
import { INavigationData } from '../../../../src/components/SideNavigation/SideNavigation';

export interface Props {
  accordian: boolean;
}

export interface State {
   
}
const children: INavigationData[] = [
  {
      id: 1,
      label: 'Basics', 
      icon: 'notes',
      action: () => console.log('Basics is clicked!')
  },
]
class SideNavigationExampleFirst extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        <FormLayout>
            <SideNavigation accordian={false} source={children}  />
        </FormLayout>
      </div>
    );
  }
}

export default SideNavigationExampleFirst;
