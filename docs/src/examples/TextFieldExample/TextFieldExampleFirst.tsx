import * as React from 'react';
import { TextField , ChoiceList , FormLayout , Select  } from '../../../../src/components/';

import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class TextFieldExampleFirst extends React.Component<IProps , IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.example}>
        1. Default TextField with label prop:
        <TextField label="TextField Label" />
        <br/>
        2. Number Field with value prop:
        <TextField
          label=""
          type="number"
          value="1"
        />
        <br/>
        3. Email Field:
        <TextField
          label=""
          type="email"
        />
        <br/>
        4. Multiline TextField:
        <TextField
          label="Shipping address"
          multiline
        />
        <br/>
        5. TextField with Hidden Label:
        <FormLayout>
          <ChoiceList
            title="Gift card auto-expiration"
            choices={[
              {
                label: 'Gift cards never expire',
                value: 'no',
              },
              {
                label: 'Gift cards expire',
                value: 'yes',
              },
            ]}
            selected={['yes']}
          />
          <TextField
            label="Gift cards expire after"
            labelHidden
            value="12"
            connectedRight={<Select label="Unit of time" labelHidden options={['months after purchase']} />}
          />
        </FormLayout>
        <br/>
      6. TextField with Label Action:
        <TextField
          label="Tariff code"
          labelAction={{ content: 'Look up codes' }}
        />
        <br/>
      7. TextField with placeholder text:
        <TextField
          label="Zone name"
          placeholder="e.g. North America, Europe"
        />
        <br/>
      8. TextField with Help Text:
        <TextField
          label="Account email"
          type="email"
          helpText="We’ll use this address if we need to contact you about your account."
        />
        <br/>
      9. TextField with prefix or Suffix:
        <TextField
          label="Price"
          type="number"
          prefix="$"
        />
        <br/>
      10. TextField with connected Fields:
        <TextField
          label="Weight"
          type="number"
          connectedRight={<Select label="Weight unit" labelHidden options={[
            'kg',
            'lb',
          ]} />}
        />
        <br/>
      11. TextField with Validation Error:
        <TextField errors={['This field is mandatory.']} label="TextField" />
        </div>
    );
  }
}

export default TextFieldExampleFirst;
