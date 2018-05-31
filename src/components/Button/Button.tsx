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
  // To display the URL link.
  url?: string;
  // The content to display inside the button.
  children?: string;
  // Change the size of the button. It can be slim or large
  customSize?: Size;
  // Allows the button to grow to the width of its container
  fullWidth?: boolean;
  // Display as primary button.
  primary?: boolean;
  // Display an outlined button.
  outline?: boolean;
  // Display as destructive button.
  destructive?: boolean;
  // Display button as disable.
  disabled?: boolean;
  // Use plain button style.
  plain?: boolean;
  // Force url to open in a new tab.
  external?: boolean;
  // Button will submit a form.
  submit?: boolean;
  // Display button with a disclosure icon.
  disclosure?: boolean;
  // Visually hidden text for screen readers.
  accessibilityLabel?: string;
  // Icon to display in the banner.
  icon?: IconProps['source'];
  // To display the styling.
  customStyle?: React.CSSProperties;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when clicked.
  onClick?(e: React.FormEvent<HTMLElement>): void;
  // Callback when button becomes focussed.
  onFocus?(): void;
  // Callback when focus leaves button.
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
  customSize,
  fullWidth,
  customStyle,
  theme,
}: Props) => {
  const className = classNames(
    theme.button,
    primary && theme.primary,
    outline && theme.outline,
    destructive && theme.destructive,
    disabled && theme.disabled,
    plain && theme.plain,
    customSize && theme[variationName('size', customSize)],
    fullWidth && theme.fullWidth,
    icon && children == null && theme.iconOnly
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
      <span className={theme.content}>
        {iconMarkup}
        {childMarkup}
        {disclosureIconMarkup}
      </span>
    )
    : <span className={theme.content}>{childMarkup}</span>;

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
          style={customStyle}
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
          style={customStyle}
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
  }

  return buttonFrom(actions as ComplexAction, overrides);
}

export function buttonFrom(
  { content, onAction, ...action }: ComplexAction,
  overrides?: Partial<Props>,
  key?: any
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
