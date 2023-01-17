import * as React from 'react';
import { Icon, Tooltip } from '../index';
// import * as baseTheme from './SwitchCheckbox.scss';

import { classNames } from '@shopify/react-utilities/styles';
import { PreferredPosition } from '../PositionedOverlay';
import { Color } from '../Icon/Icon'

export interface Props {
    // Set theme for SwitchCheckbox
    theme?: any;
    // To apply custom styling.
    componentStyle?: React.CSSProperties;
    // Set a custom class
    componentClass?: string;
    // Component id
    componentId?: string;
    // Error details
    error: string | null;
    // Tooltip postion
    preferredPosition?: PreferredPosition;
    // Icon Color
    iconColor?: Color
}


const Error = (props: Props) => {

    const { error, componentClass, componentStyle, preferredPosition, iconColor } = props
    const className = classNames(
        componentClass
    );
    return (
        <div style={{ ...componentStyle }} className={className}>
            <Tooltip preferredPosition={preferredPosition ? preferredPosition : "above"} content={error}>
                <Icon componentColor={iconColor ? iconColor : 'redDark'} source={"errorIcon"} />
            </Tooltip>
        </div>
    );
};

export default Error;
