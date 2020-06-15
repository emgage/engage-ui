import * as React from 'react';
import { VisuallyHidden, Card, Heading, FormLayout, TextField, CardBody } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const VisuallyHiddenExample = () => (
  <div className={styles.example}>
    <br />
    <Card>
      <CardBody sectioned={false}>
      <VisuallyHidden>
        <Heading>Title and description</Heading>
      </VisuallyHidden>
      <FormLayout>
        <TextField
          label="Title"
          value="Artisanal Wooden Spoon"
          alphanumeric={false}
          autoComplete={false}
          autoFocus={false}
          autoSuggest={false}
          backdropHidden={false}
          capital={false}
          disabled={false}
          enableTextCounter={false}
          hasValue={false}
          isFocused={false}
          itemSelected={false}
          labelHidden={false}
          loading={false}
          readOnly={false}
          required={false}
          resizable={false}
          showNumberIcon={false}
          spellCheck={false}
        />
        <TextField
          label="Description"
          multiline
          alphanumeric={false}
          autoComplete={false}
          autoFocus={false}
          autoSuggest={false}
          backdropHidden={false}
          capital={false}
          disabled={false}
          enableTextCounter={false}
          hasValue={false}
          isFocused={false}
          itemSelected={false}
          labelHidden={false}
          loading={false}
          readOnly={false}
          required={false}
          resizable={false}
          showNumberIcon={false}
          spellCheck={false}
        />
      </FormLayout>
      </CardBody>
    </Card>
  </div>
);

export default VisuallyHiddenExample;
