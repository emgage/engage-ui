import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { DisplayMoreInfo } from '../Picker/PickerEnum';
import { CHIP } from '../ThemeIdentifiers';
import * as baseTheme from './Chip.scss';

export interface Props {
  clickable?: boolean;
  removable?: boolean;
  image?: {
    url: string,
    alt?: string,
  };
  transparent?: boolean;
  moreInfoComponent?: React.ReactNode;
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
  onRemove?(event: any): void;
  onClick?(event: any): void;
  handleMoreInfo?(): void;
  key?: any;
  markedForDelete?: boolean;
  children?: string;
}

class Chip extends React.PureComponent<Props, any> {
  render() {
    const {
      clickable,
      removable,
      image,
      transparent,
      theme,
      onRemove,
      onClick,
      children,
    } = this.props;

    const className = classNames(
      theme.Chip,
      transparent && theme.transparent);

    const chipContents = [(
      image
      ?
      <img className={theme.Image} src={image.url} alt={image.alt} key="1" aria-hidden/>
      : ''
    ),
      <span key="2">
        {children}
      </span>,
    ];
    const isClickable = clickable ?
      <a onClick={onClick} aria-disabled={false} tabIndex={0}>
        {chipContents}
      </a>
      : chipContents;
    const isRemovable = removable ?
      <button type="button" className={theme.Remove} aria-label={'Remove ' + children} onClick={onRemove}>
        <span aria-hidden="true">×</span>
      </button>
      : '';
    const returnedValue = clickable || removable ? React.createElement('span', { className }, isClickable, isRemovable) : React.createElement('button', { className }, isClickable, isRemovable);

    return returnedValue;
  }
}

export default themr(CHIP, baseTheme)(Chip) as ThemedComponentClass<Props, {}>;
