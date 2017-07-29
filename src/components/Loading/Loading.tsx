import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Icon from '../Icon';
import { LOADING } from '../ThemeIdentifiers';
import * as baseTheme from './Loading.scss';

export interface Props {
    style?: React.CSSProperties,
    theme?: any,
};

class Loading extends React.PureComponent<Props, {}> {
    render() {
        const {
            style,
            theme,
        } = this.props;

        return (
            <div style={style}>
                <span className={theme.loading}><Icon source="horizontalDots" backdrop /></span>
                <span className={theme.srOnly}>Loading...</span>
            </div>
        );
    }
}

export default themr(LOADING, baseTheme)(Loading) as ThemedComponentClass<Props, {}>;
