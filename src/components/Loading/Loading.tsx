import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { LOADING } from '../ThemeIdentifiers';

import * as baseTheme from './Loading.scss';

export interface Props {
  // To apply style externally for this component
  componentStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
}

class Loading extends React.PureComponent<Props, {}> {
  render() {
    const {
      componentStyle,
            theme,
        } = this.props;

    return (
            <div style={componentStyle}>
                <span className={theme.loading}><Icon source="spinner" /></span>
                <VisuallyHidden>Loading...</VisuallyHidden>
            </div>
    );
  }
}

export default themr(LOADING, baseTheme)(Loading) as ThemedComponentClass<Props, {}>;
