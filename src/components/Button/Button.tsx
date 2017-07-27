import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities';

import { ComplexAction } from '../../types';
import UnstyledLink from '../UnstyledLink';
import Icon, { Props as IconProps } from '../Icon';

import { BUTTON } from '../ThemeIdentifiers';
import * as baseTheme from './Button.scss';

export type Size = 'slim' | 'large';

export interface Props {
  url?: string;
  children?: string;
  size?: Size;
  fullWidth?: boolean;
  primary?: boolean;
  outline?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  plain?: boolean;
  external?: boolean;
  submit?: boolean;
  disclosure?: boolean;
  accessibilityLabel?: string;
  icon?: IconProps['source'];
  style?: React.CSSProperties;
  theme?: any;
  onClick?(): void;
  onFocus?(): void;
  onBlur?(): void;
}

const button = ({
  url,
  disabled,
  children,
  accessibilityLabel,
  onClick,
  onFocus,
  onBlur,
  external,
  icon,
  primary,
  outline,
  destructive,
  disclosure,
  plain,
  submit,
  size,
  fullWidth,
  style,
  theme,
}: Props) => {
  const className = classNames(
    theme.button,
    primary && theme.primary,
    outline && theme.outline,
    destructive && theme.destructive,
    disabled && theme.disabled,
    plain && theme.plain,
    size && theme[variationName('size', size)],
    fullWidth && theme.fullWidth,
    icon && children == null && theme.iconOnly,
  );

  const disclosureIconMarkup = disclosure
    ? <span className={theme.icon}><Icon source="caretDown" /></span>
    : null;

  const iconMarkup = icon
    ? <span className={theme.icon}><Icon source={icon} /></span>
    : null;

  const childMarkup = children ? <span>{children}</span> : null;

  const content = iconMarkup || disclosureIconMarkup
    ? (
      <span className={theme.Content}>
        {iconMarkup}
        {childMarkup}
        {disclosureIconMarkup}
      </span>
    )
    : <span className={theme.Content}>{childMarkup}</span>;

  const type = submit ? 'submit' : 'button';

  return (
    url
    ? (
      <UnstyledLink
        url={url}
        external={external}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseUp={handleMouseUp}
        className={className}
        disabled={disabled}
        aria-label={accessibilityLabel}
        style={style}
      >
        {content}
      </UnstyledLink>
    )
    : (
      <button
        type={type}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseUp={handleMouseUp}
        className={className}
        disabled={disabled}
        aria-label={accessibilityLabel}
        style={style}
      >
        {content}
      </button>
    )
  );
};

const THEMEDBUTTON = themr(BUTTON, baseTheme)(button) as ThemedComponentClass<Props, {}>;

function handleMouseUp({ currentTarget }: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  currentTarget.blur();
}

export function buttonsFrom(action: ComplexAction, overrides?: Partial<Props>): React.ReactElement<Props>;
export function buttonsFrom(actions: ComplexAction[], overrides?: Partial<Props>): React.ReactElement<Props>[];
export function buttonsFrom(actions: ComplexAction[] | ComplexAction, overrides: Partial<Props> = {}) {
  if ((actions as ComplexAction[]).length != null) {
    return (actions as ComplexAction[]).map((action, index) => buttonFrom(action, overrides, index));
  } else {
    return buttonFrom(actions as ComplexAction, overrides);
  }
}

export function buttonFrom(
  { content, onAction, ...action }: ComplexAction,
  overrides?: Partial<Props>,
  key?: any,
) {
  return (
    <THEMEDBUTTON
      key={key}
      children={content}
      onClick={onAction}
      {...action}
      {...overrides}
    />
  );
}

export default THEMEDBUTTON;
