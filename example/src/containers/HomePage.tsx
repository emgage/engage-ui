import * as React from 'react';
import { MaskTextField, Heading } from '../../../src/components';
import '../styles/home-page.scss';

// tslint:disable-next-line:import-name
import * as styles from '../styles/global-styles.scss';

// tslint:disable-next-line:variable-name
const HomePage = () => {
  return (
      <div className={styles.component_container}>
        <div className={styles.homepage}> 
          <Heading>Heading</Heading>
          <div>
            <Heading>Phone</Heading>
            <MaskTextField label="lblPhone1" placeholder="Enter Data" mask="+4\9 99 999 99" />
            <MaskTextField label="lblPhone2" placeholder="Enter Data" mask="+7 (999) 999-99-99" />
          </div>
          <div>
            <Heading>Date</Heading>
            {/* <MaskTextField label="lblDate1" mask="99-99-9999" defaultValue="03-06-2017" /> */}
            {/* <MaskTextField label="lblDate2" placeholder="Enter Data" mask="99/99/9999" /> */}
          </div>
          <div>
            <Heading>Card</Heading>
            <MaskTextField label="lblCard1" placeholder="Enter Card" mask="9999-9999-9999-9999" />
            <MaskTextField label="lblCard2" placeholder="Enter Card" mask="**-aaa" />
          </div>
        </div>
      </div>
  );
};
  
export default HomePage;
