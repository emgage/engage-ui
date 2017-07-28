import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import Image from '../Image';
import { AVATAR } from '../ThemeIdentifiers';

import * as baseTheme from './Avatar.scss';
import * as avatars from './images';

export type Size = 'small' | 'medium' | 'large' ;

const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five', 'six'];
const AVATAR_IMAGES = Object.keys(avatars).map((key: keyof typeof avatars) => avatars[key]);

export interface Props {
  size?: Size;
  name?: string;
  initials?: string;
  customer?: boolean;
  source?: string;
  accessibilityLabel?: string;
  theme?: any;
}

class Avatar extends React.Component<Props, {}> {
  render() {
    const {
      name,
      source,
      initials,
      customer,
      size = 'medium',
      accessibilityLabel,
      theme,
    } = this.props;

    const nameString = name || initials;

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
      size && theme[variationName('size', size)],
    );

    let content = null;

    if (finalSource) {
      content = <Image className={theme.Image} source={finalSource} alt="" role="presentation" />;
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
