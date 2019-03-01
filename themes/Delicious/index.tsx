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
  PProcess: require('./Process.scss'),
  PSelect: require('./Select.scss'),
  PTextField: require('./TextField.scss'),
};

export default (props: any) => {
  return (
    <ThemeProvider theme={DeliciousThemeContext}>
      {props.children}
    </ThemeProvider>
  );
};
