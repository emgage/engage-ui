import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Icon from '../Icon';

import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';

export interface Props {
  theme?: any;
  onChange(delta: number): void;
  onClick?(): void;
}

const spinner = ({ theme, onChange, onClick }: Props)  => {
  function handleStep(step: number) {
    return () => onChange(step);
  }

  return (
    <div className={theme.spinner} onClick={onClick} aria-hidden>
      <div
        role="button"
        className={theme.segment}
        tabIndex={-1}
        onClick={handleStep(1)}
      >
        <div className={theme.spinnerIcon}>
          <Icon source="caretUp" />
        </div>
      </div>

      <div
        role="button"
        className={theme.segment}
        tabIndex={-1}
        onClick={handleStep(-1)}
      >
        <div className={theme.spinnerIcon}>
          <Icon source="caretDown" />
        </div>
      </div>
    </div>
  );
};

export default themr(TEXT_FIELD, baseTheme)(spinner) as ThemedComponentClass<Props, {}>;
