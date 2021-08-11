import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { NODATA } from '../ThemeIdentifiers';
import * as baseTheme from './NoData.scss';
import Icon, { IconColor, IconList } from '../Icon';
import BodyText, { Color }  from '../BodyText/BodyText';

export interface Props {
    // Css class name
  componentClass?: string;
    // Custom css style
  componentStyle?: React.CSSProperties;
    // Theme to be injected via css-themr
  theme?: any;
    // Icon Class
  iconClass?: string;
    // Icon Style
  iconStyle?: React.CSSProperties;
    // icon Color
  iconColor?: IconColor;
    // Loading component can show any icon as spinner by passing the source
  iconSource?: keyof typeof IconList;
    // Add Label to component
  label?: any;
    // Label Color
  labelColor?: Color;
}

const NoData = ({
    theme,
    componentClass= '',
    componentStyle,
    iconClass,
    iconStyle,
    iconColor= 'inkLighter',
    iconSource = 'import',
    label,
    labelColor= 'mid'

}:Props) => {
  const className = classNames(
        componentClass,
        theme.NoData
    );
  return (
        <div className={className} style={componentStyle}>
            <Icon componentClass={iconClass} componentStyle={iconStyle} componentColor={iconColor} source={iconSource} theme={theme}/>
            {
                label && <BodyText componentColor={labelColor} theme={theme}>{label}</BodyText>
            }

        </div>
    );
};

export default themr(NODATA, baseTheme)(NoData) as ThemedComponentClass<Props, {}>;
