import * as React from 'react';
import { ThemeProvider } from 'react-css-themr';

const contextTheme = {
//   PLink: require('./Link.scss'),
//   PLabel: require('./Label.scss'),÷]
//   PLabelled: require('./Labelled.scss'),
//   PMessage: require('./Message.scss'),
//   PTextField: require('./TextField.scss'),
};

export default (props: any) => {
    return (
        <ThemeProvider theme={contextTheme}>
            {props.children}
        </ThemeProvider>
    )
}