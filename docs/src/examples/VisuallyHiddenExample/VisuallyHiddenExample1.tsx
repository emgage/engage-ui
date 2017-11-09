import * as React from 'react';
import { VisuallyHidden } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const VisuallyHiddenExample1 = () => (
  <div className={styles.example}>
    <br />
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

export default VisuallyHiddenExample1;
