import * as React from 'react';
import { Button, Card, CardSection, CardBody , CardFooter, CardHeader } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
  <Card>
    <CardHeader>Online store dashboard</CardHeader>
    <CardBody>
    <CardSection>
        <p>View a summary of your online store’s performance.</p>
      </CardSection>
    <CardFooter>
      <Button>Ok</Button>
    </CardFooter>
    </CardBody>
    </Card>
  </div>
);

export default CardExample;
