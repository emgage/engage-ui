import * as React from 'react';
import { VisuallyHidden } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

export interface IProps{
}

export interface IState {
}

class VisuallyHiddenExampleSecond extends React.Component<IProps, IState> {
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
        <h3>2.Visually Hidden Table Headers:</h3>
        <br/>
        <table>
          <thead>
            <tr>
              <th scope="col">
                  <VisuallyHidden>Line item</VisuallyHidden>
              </th>
              <th scope="col">
                  <VisuallyHidden>Value</VisuallyHidden>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Subtotal</th>
              <td>$184.13</td>
            </tr>
            <tr>
              <th scope="row">Tax</th>
              <td>$0.00</td>
            </tr>
            <tr>
              <th scope="row">Total</th>
              <td>$184.13</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default VisuallyHiddenExampleSecond;
