import * as React from 'react';
import { themr } from 'react-css-themr';
import Icon from '../Icon';

import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';

export interface Props {
  theme?: any,
  onChange(delta: number): void,
  onClick?(): void,
}

const Spinner = ({theme, onChange, onClick}: Props)  => {
  function handleStep(step: number) {
    return () => onChange(step);
  }

  return (
    <div className={theme.Spinner} onClick={onClick} aria-hidden>
      <div
        role="button"
        className={theme.Segment}
        tabIndex={-1}
        onClick={handleStep(1)}
      >
        <div className={theme.SpinnerIcon}>
          <Icon source="caretUp" />
        </div>
      </div>

      <div
        role="button"
        className={theme.Segment}
        tabIndex={-1}
        onClick={handleStep(-1)}
      >
        <div className={theme.SpinnerIcon}>
          <Icon source="caretDown" />
        </div>
      </div>
    </div>
  );
}

export default themr(TEXT_FIELD, baseTheme)(Spinner);
