import * as React from 'react';

import Icon from '../../../Icon';
import { Error } from '../../types';

import * as styles from './InlineError.scss';

export interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

// tslint:disable-next-line: function-name
export function InlineError({ message, fieldID }: InlineErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div id={errorTextID(fieldID)} className={styles.InlineError}>
      <div className={styles.Icon}>
        <Icon source="alert" />
      </div>
      {message}
    </div>
  );
}

export function errorTextID(id: string) {
  return `${id}Error`;
}
