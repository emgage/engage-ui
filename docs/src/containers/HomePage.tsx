import * as React from 'react';
import Heading from '../components/Heading';
import Labelled from '../../../src/components/Labelled';

import '../styles/home-page.scss';

// tslint:disable-next-line:import-name
import * as styles from '../styles/global-styles.scss';


const HomePage = () => {
  const theme = {
    hidden: 'hidden',
    required: 'required',
    focused: 'focused',
    invalid: 'invalid',
    empty: 'empty',
    HelpText: 'HelpText',
  };
  const action = () => console.log('go');
  return (
      <div className={styles.component_container}>
        <div className={styles.homepage}>
          <Heading value="Engage-UI" />
          <Labelled
            id="Id"
            label="Click Here"
            action={action}
            theme={theme}
            required
            helpText="HelpText"
            focused
            hasValue>
            Hello World
          </Labelled>
        </div>
      </div>
  );
};

export default HomePage;
