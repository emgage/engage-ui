import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Action} from '../../types';
import {buttonFrom} from '../Button';

import * as styles from './Label.scss';

export {Action};

export interface Props {
  children?: string,
  id: string,
  action?: Action,
  hidden?: boolean,
  style?: React.CSSProperties,
};

export function labelID(id: string) {
  return `${id}Label`;
}

export default function Label({children, id, action, hidden, style}: Props) {
  const className = classNames(
    styles.Label,
    hidden && styles.hidden,
  );

  const actionMarkup = action
    ? buttonFrom(action, {plain: true})
    : null;

  return (
    <div className={className}>
      <label id={labelID(id)} htmlFor={id} className={styles.Text} style={style}>{children}</label>
      {actionMarkup}
    </div>
  );
}
