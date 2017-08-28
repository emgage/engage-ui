import * as React from 'react';
import { VisuallyHidden,Card,Heading,FormLayout,TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}


class VisuallyHiddenExampleFirst extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1.Visually Hidden Headings:</h3>
        <br/>
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
  }
}

export default VisuallyHiddenExampleFirst;
