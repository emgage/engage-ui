import * as React from 'react';
import { ThemeProvider } from '@friendsofreactjs/react-css-themr';

const contextTheme = {

};

export default (props: any) => {
    return (
        <ThemeProvider theme={contextTheme}>
            {props.children}
        </ThemeProvider>
    )
}