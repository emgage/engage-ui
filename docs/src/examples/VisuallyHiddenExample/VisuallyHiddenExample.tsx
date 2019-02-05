import * as React from 'react';
import { VisuallyHidden, Card, Heading, FormLayout, TextField, CardBody } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const VisuallyHiddenExample = () => (
  <div className={styles.example}>
    <br />
    <Card>
      <CardBody>
      <VisuallyHidden>
        <Heading>Title and description</Heading>
      </VisuallyHidden>
      <FormLayout>
        <TextField
          label="Title"
          value="Artisanal Wooden Spoon"
        />
        <TextField
          label="Description"
          multiline
        />
      </FormLayout>
      </CardBody>
    </Card>
  </div>
);

export default VisuallyHiddenExample;
