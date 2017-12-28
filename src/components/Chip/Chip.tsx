import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
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
  style?: React.CSSProperties;
  theme?: any;
  onRemove?(event: any): void;
  onClick?(event: any): void;
  key?: any;
  children?: string;
}

class Chip extends React.PureComponent<Props, any> {

  onKeyDown = (item: any, e: KeyboardEvent) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      return this.props.onRemove ? this.props.onRemove(item) : null;
    }
  }

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
        <img className={theme.Image} src={image.url} alt={image.alt} key="1" aria-hidden />
        : ''
    ),
      <span key="2">
      {children}
    </span>,
    ];
    const isClickable = clickable ?
      <a onClick={onClick} aria-disabled={false}>
        {chipContents}
      </a>
      : chipContents;
    const isRemovable = removable ?
      <a className={theme.Remove} aria-label={'Remove ' + children} onClick={onRemove} tabIndex={-1}>
        <span aria-hidden="true">×</span>
      </a>
      : '';
    const returnedValue = clickable || removable ? React.createElement('button', { className }, isClickable, isRemovable) : React.createElement('button', { className }, isClickable, isRemovable);

    return (
      <span
        onKeyDown={removable ? this.onKeyDown.bind(this, Event) : null}
      >
        {returnedValue}
      </span>
    );
  }
}

export default themr(CHIP, baseTheme)(Chip) as ThemedComponentClass<Props, {}>;
