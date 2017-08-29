import * as React from 'react';
import Heading from '../components/Heading';

import '../styles/home-page.scss';

// tslint:disable-next-line:import-name
import * as styles from '../styles/global-styles.scss';

const HomePage = () => {
  return (
      <div className={styles.component_container}>
        <div className={styles.homepage}> 
          <Heading value="Engage-UI" />
          <p>This is the home or root page for the engage-ui docs</p>
          <p>Just some text about how amazing the engage-ui library truely is</p>
        </div>
      </div>
  );
};
  
export default HomePage;
