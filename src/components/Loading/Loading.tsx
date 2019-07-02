import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import Icon, { IconColor, IconList } from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { LOADING } from '../ThemeIdentifiers';

import * as baseTheme from './Loading.scss';

export interface Props {
  // To apply style externally for this component
  componentStyle?: React.CSSProperties;
  // If any style needs to be passed in the icon
  iconStyle?: React.CSSProperties;
  // User can pass the class to the icon component
  iconClass?: string;
  // Loading component can show any icon as spinner by passing the source
  iconSource?: keyof typeof IconList;
  // Change the loading color
  iconColor?: IconColor;
  // Theme to be injected via css-themr
  theme?: any;
}

class Loading extends React.PureComponent<Props, {}> {
  render() {
    const {
      componentStyle,
      iconClass = '',
      iconSource = 'spinner',
      iconStyle,
      iconColor,
      theme,
    } = this.props;

    return (
      <div className={theme.loadingContainer} style={componentStyle}>
          <span className={theme.loading}>
            <Icon componentClass={iconClass} componentStyle={iconStyle} componentColor={iconColor} source={iconSource} theme={theme} />
          </span>

          <VisuallyHidden theme={theme}>Loading...</VisuallyHidden>
      </div>
    );
  }
}

export default themr(LOADING, baseTheme)(Loading) as ThemedComponentClass<Props, {}>;
