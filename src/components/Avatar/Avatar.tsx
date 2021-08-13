import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import Image from '../Image';
import { AVATAR } from '../ThemeIdentifiers';

import * as baseTheme from './Avatar.scss';
import * as avatars from './images';

// Enum of size, used to define size of Avtar component
export type Size = 'small' | 'medium' | 'large';

const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five', 'six'];
const AVATAR_IMAGES = Object.keys(avatars).map((key: keyof typeof avatars) => avatars[key]);

export interface Props {
  // Size of avatar. It can be small, medium or large
  componentSize?: Size;
  // Name of the person for avatar
  componentName?: string;
  // Initials of person to display
  initials?: string;
  // Weather avatar is for customer
  customer?: boolean;
  // URL of the avatar image
  source?: string;
  // Accessible label for the avatar image
  accessibilityLabel?: string;
  // Theme to be injected via css-themr
  theme?: any;
  // To provide styling.
  imageComponentStyle?: React.CSSProperties;
  // Loads default static image when source image fails to load
  defaultSource?: string;
}

class Avatar extends React.PureComponent<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      source: this.props.source,
    };
  }
  onError = () => {
    const { defaultSource } = this.props;
    if (defaultSource) {
      this.setState({ source: defaultSource });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.source !== this.props.source) {
      this.setState({ source: nextProps.source });
    }
  }

  render() {
    const {
      componentName,
      initials,
      customer = false,
      componentSize = 'medium',
      accessibilityLabel,
      theme,
      imageComponentStyle
    } = this.props;
    const { source } = this.state;
    const nameString = componentName || initials;

    let finalSource: string | undefined;
    let label: string | undefined;

    if (accessibilityLabel) {
      label = accessibilityLabel;
    } else if (name) {
      label = name;
    } else if (initials) {
      label = `Avatar with initials ${initials.split('').join(' ')}`;
    } else {
      label = 'Avatar';
    }

    if (source) {
      finalSource = source;
    } else if (customer) {
      finalSource = customerPlaceholder(nameString);
    }

    const className = classNames(
      theme.avatar,
      theme[variationName('style', styleClass(nameString))],
      source && theme.hasImage,
      componentSize && theme[variationName('size', componentSize)]
    );

    let content = null;

    if (finalSource) {
      content = <Image className={theme.Image} source={finalSource} alt="" role="presentation" style={imageComponentStyle} onError={this.onError} />;
    } else if (initials) {
      content = <span aria-hidden className={theme.Initials}>{initials}</span>;
    }

    return <div aria-label={label} role="img" className={className}>{content}</div>;
  }
}

function styleClass(name?: string) {
  return name
    ? STYLE_CLASSES[name.charCodeAt(0) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];
}

function customerPlaceholder(name?: string) {
  return name
    ? AVATAR_IMAGES[name.charCodeAt(0) % AVATAR_IMAGES.length]
    : AVATAR_IMAGES[0];
}

export default themr(AVATAR, baseTheme)(Avatar) as ThemedComponentClass<Props, {}>;
