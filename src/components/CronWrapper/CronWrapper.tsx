import * as React from 'react';
import { ThemedComponentClass, themr } from '@friendsofreactjs/react-css-themr';
import { CRONWRAPPER } from '../ThemeIdentifiers';
import * as baseTheme from './CronWrapper.scss';
import { classNames } from '@shopify/react-utilities/styles';
import { Cron, ClearButtonAction, AllowEmpty, ClockFormat, PeriodType, LeadingZero, Mode, CronType, Locale, ClearButtonProps } from 'react-js-cron';
import 'antd/dist/antd.css';
import 'react-js-cron/dist/styles.css';
import TextField from '../TextField';

type CronError = {
  type: 'invalid_cron';
  description: string;
} | undefined;

export interface Props {
  // Set theme for CronWrapper
  theme?: any;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
  // Set a custom class
  componentWrapperClass?: string;
  componentClass?: string;
  componentId?: string;
  children?: React.ReactNode;

  value: string;

  // component props to handle toggle
  disabled?: boolean;
  readOnly?: boolean;
  humanizeLabels?: boolean;
  humanizeValue?: boolean;
  displayErrorStyle?: boolean;
  displayClearButton?: boolean;
  periodicityOnDoubleClick?: boolean;
  clearButtonAction?: ClearButtonAction;
  supportShortcuts?: boolean;
  allowEmpty?: AllowEmpty;
  clockFormat?: ClockFormat;
  defaultPeriod?: PeriodType;
  leadingZero?: LeadingZero;
  mode?: Mode;
  allowedDropdowns?: CronType[];
  allowedPeriods?: PeriodType[];
  locale?: Locale;
  clearButtonProps?: ClearButtonProps;

  displayInput?: boolean;
  readOnlyInput?: boolean;

  onChange: (value: string) => void;
  onError?: (error: CronError) => void;
}

const CronWrapper = (props: Props) => {
  const { value = '* * * * *', onChange, onError, children } = props;
  const { theme, componentWrapperClass, componentClass, componentStyle } = props;
  const { disabled, readOnly, humanizeLabels, humanizeValue,
    displayErrorStyle, displayClearButton = true, supportShortcuts, periodicityOnDoubleClick } = props;
  const { clearButtonAction, allowEmpty, clockFormat, defaultPeriod, leadingZero, mode,
    allowedDropdowns, allowedPeriods, locale, clearButtonProps } = props;
  const { displayInput = true, readOnlyInput } = props;


  const className = classNames(
    componentWrapperClass,
    theme.CronWrapper,
    disabled && theme.disableCron
  );
  return (
    <div style={componentStyle} className={className}>
      {displayInput && <div>
        <TextField
          type="text"
          readOnly={readOnlyInput || mode === 'single'}
          value={value}
          onChange={(value) => {
            onChange(value);
          }}
        />
      </div>}
      {children}
      <Cron
        value={value}
        setValue={onChange}
        onError={onError}
        disabled={disabled}
        readOnly={readOnly}
        humanizeLabels={humanizeLabels}
        humanizeValue={humanizeValue}
        displayError={displayErrorStyle}
        clearButton={displayClearButton}
        clearButtonAction={clearButtonAction}
        shortcuts={supportShortcuts}
        allowEmpty={allowEmpty}
        clockFormat={clockFormat}
        defaultPeriod={defaultPeriod}
        leadingZero={leadingZero}
        className={componentClass}
        periodicityOnDoubleClick={periodicityOnDoubleClick}
        mode={mode}
        allowedDropdowns={allowedDropdowns}
        allowedPeriods={allowedPeriods}
        locale={locale}
        clearButtonProps={clearButtonProps}
      />
    </div>
  );
};

export default themr(CRONWRAPPER, baseTheme)(CronWrapper) as ThemedComponentClass<Props, {}>;
