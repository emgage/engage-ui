import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { CHIP } from '../ThemeIdentifiers';
import * as baseTheme from './Chip.scss';
import Icon, { IconList } from '../Icon';

export interface Props {
  // Makes the chips body area clickable.
  clickable?: boolean;
  // Enables the deletion of chips through the remove icon or the Delete/Backspace key.
  removable?: boolean;
  // The image url and alt tag that will be shown in the chip.
  image?: {
    url: string,
    alt?: string,
  };
  // Make the chip transparent.
  transparent?: boolean;
  // Theme to be injected via css-themr
  theme?: any;
  // Fired when remove button on chip is clicked.
  onRemove?(event: React.FormEvent<HTMLElement>): void;
  // Makes the chips body area clickable.
  onClick?(event: React.FormEvent<HTMLElement>): void;
  // The content to display inside chip.
  children?: string;
  // Icon replace default cancel icon
  icon?: keyof typeof IconList;
  // Icon click handler
  onIconClick?(): void;
}

class Chip extends React.PureComponent<Props, any> {

  onKeyDown = (item: React.FormEvent<HTMLElement>, e: KeyboardEvent) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      return this.props.onRemove ? this.props.onRemove(item) : null;
    }
  }

  render() {
    const {
      clickable = false,
      removable = false,
      image,
      transparent = false,
      theme,
      onRemove,
      onClick,
      children,
      icon,
      onIconClick
    } = this.props;

    const className = classNames(
      theme.Chip,
      transparent && theme.transparent);

    const chipContents = [(
      image && image.url
        ?
        <img className={theme.Image} src={image.url} alt={image.alt} key="1" aria-hidden />
        : ''
    ),
      <span className={theme.chipContent} key="2">
      {children}
      { icon && <span > <Icon onClick={onIconClick} source={icon} theme={theme} /> </span> }
    </span>,
    ];
    const isClickable = clickable ?
      <a onClick={onClick} aria-disabled={false}>
        {chipContents}
      </a>
      : chipContents;
    const isRemovable = removable ?
      <a className={theme.Remove} aria-label={'Remove ' + children} onClick={onRemove} tabIndex={-1}>
        <Icon source="cancel" theme={theme} />
      </a>
      : '';

    return (
        React.createElement('button', { className, onKeyDown: removable ? this.onKeyDown.bind(this, Event) : null }, isClickable, isRemovable)
    );
  }
}

export default themr(CHIP, baseTheme)(Chip) as ThemedComponentClass<Props, {}>;
