import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { LOADING } from '../ThemeIdentifiers';

import * as baseTheme from './Loading.scss';
import * as loading from '../Icon/images';

export interface Props {
  style?: React.CSSProperties;
  theme?: any;
}

const LOADING_IMAGES = Object.keys(loading).map((key: keyof typeof loading) => loading[key]);

class Loading extends React.PureComponent<Props, {}> {
  render() {
    const {
            style,
            theme,
        } = this.props;

    return (
            <div style={style}>
                <span className={theme.loading}><Icon source={LOADING_IMAGES[0]} backdrop /></span>
                <VisuallyHidden>Loading...</VisuallyHidden>
            </div>
    );
  }
}

export default themr(LOADING, baseTheme)(Loading) as ThemedComponentClass<Props, {}>;
