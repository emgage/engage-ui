import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { LOADING } from '../ThemeIdentifiers';
import * as baseTheme from './Loading.scss';

export interface Props {
  style?: React.CSSProperties;
  theme?: any;
}

class Loading extends React.PureComponent<Props, {}> {
  render() {
    const {
            style,
            theme,
        } = this.props;

    return (
            <div>
                <span style={style}>
                    <i className={theme.loader}></i>
                    <span className={theme.srOnly}>Loading...</span>
                </span>
                {this.props.children}
            </div>
    );
  }
}

export default themr(LOADING, baseTheme)(Loading) as ThemedComponentClass<Props, {}>;
