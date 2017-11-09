import * as React from 'react';
import { VisuallyHidden, Card, Heading, FormLayout, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const VisuallyHiddenExample = () => (
  <div className={styles.example}>
    <br />
    <Card sectioned>
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
    </Card>
  </div>
);

export default VisuallyHiddenExample;
