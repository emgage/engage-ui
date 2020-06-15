import * as React from 'react';
import { Badge, Button, Tab, TabPanel } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

class TabExample extends React.Component {
  state = {
    ModalOpen: false,
    activeTabId: 'tab1',
  };

  toggleModal = () => {
    this.setState({ ModalOpen: !this.state.ModalOpen });
  }

  onTabOpen = () => {
    console.log('Tab open');
  }

  onTabClose = () => {
    console.log('Tab close');
  }

  render() {
    return (
      <div className={styles.example}>
        <TabPanel position={'top'} alignment={'center'} defaultTabId={this.state.activeTabId} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} working={false} icon={false} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <Button
                onClick={this.toggleModal}
                disabled={false}
                disclosure={false}
                destructive={false}
                external={false}
                fullWidth={false}
                outline={false}
                primary={false}
                submit={false}
                plain={false}
              >
                Medium buttons
              </Button>
            </div>
          </Tab>
          <Tab tabDescription="User1" tabId={'tab3'}>
            <p>content user1</p>
          </Tab>
          <Tab tabDescription="User2" tabId={'tab4'}>
            <p>content user2</p>
          </Tab>
          <Tab tabDescription="User3" tabId={'tab5'}>
            <p>content user3</p>
          </Tab>
        </TabPanel>
      </div>
    );
  }
}

export default TabExample;
