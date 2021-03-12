import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { debounce } from 'lodash';

import Icon from '../Icon';

import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';

export interface Props {
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when value is changed.
  onChange(delta: number): any;
  // Callback when Textfield is clicked
  onClick?(): void;
}

const spinnerButtons = ({ theme, onChange, onClick }: Props)  => {

  const handleStep = (step: number) => {
    if (onChange !== null) {
      onChange(step);
    }
  };

  return (
    <div className={theme.spinnerButtons} onClick={onClick} aria-hidden>
      <div
        role="button"
        className={theme.segment}
        tabIndex={-1}
        onClick={debounce(() => handleStep(1), 500, { maxWait: 500 })}
      >
        <div className={theme.spinnerButtonsIcon}>
          <Icon source="caretUp" theme={theme} />
        </div>
      </div>

      <div
        role="button"
        className={theme.segment}
        tabIndex={-1}
        onClick={debounce(() => handleStep(-1), 500, { maxWait: 500 })}
      >
        <div className={theme.spinnerButtonsIcon}>
          <Icon source="caretDown" theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default themr(TEXT_FIELD, baseTheme)(spinnerButtons) as ThemedComponentClass<Props, {}>;
