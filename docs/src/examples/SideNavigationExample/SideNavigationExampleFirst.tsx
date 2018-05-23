import * as React from 'react';
import { SideNavigation, FormLayout } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface Props {}

export interface State {
    accordian: boolean;
}

class SideNavigationExampleFirst extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
        accordian: false,
    };
  }

  render() {
    return (
      <div className={styles.example}>
        <FormLayout>
            <SideNavigation accordian={false}>
            <p>Reveal Test</p>
              <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
              </ul>
            </SideNavigation>
        </FormLayout>
      </div>
    );
  }
}

export default SideNavigationExampleFirst;
