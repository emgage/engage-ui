import * as React from 'react';
import { ThemeProvider } from '@friendsofreactjs/react-css-themr';

export const DeliciousThemeContext = {
  PButton: require('./Button.scss'),
  PButtonGroup: require('./ButtonGroup.scss'),
  PConnected: require('./Connected.scss'),
  PDisplayText: require('./DisplayText.scss'),
  PIcon: require('./Icon.scss'),
  PLabel: require('./Label.scss'),
  PLabelled: require('./Labelled.scss'),
  PMessage: require('./Message.scss'),
  PModal: require('./Modal.scss'),
  PSelect: require('./Select.scss'),
  PSpinner: require('./Spinner.scss'),
  PTextField: require('./TextField.scss'),
  PPicker: require('./Picker.scss'),
};

export default (props: any) => {
  return (
    <ThemeProvider theme={DeliciousThemeContext}>
      {props.children}
    </ThemeProvider>
  );
};
