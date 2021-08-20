import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities';

import { ComplexAction } from '../../types';
import UnstyledLink from '../UnstyledLink';
import Icon, { Props as IconProps } from '../Icon';

import { BUTTON } from '../ThemeIdentifiers';
import * as baseTheme from './Button.scss';
import VisuallyHidden from '../VisuallyHidden';

export type Size = 'slim' | 'large';

export interface Props {
  // To display the URL link.
  url?: string;
  // The content to display inside the button.
  children?: React.ReactNode;
  // Change the size of the button. It can be slim or large
  componentSize?: Size;
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
  // name of button
  name?: string;
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
  // put icon before or after label. sending iconPosition prop will set icon after label
  iconPosition?: boolean;
  // To display the styling.
  componentStyle?: React.CSSProperties;
  // Set a custom class
  componentClass?: string;
  // Unique ID
  componentId?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when clicked.
  onClick?(e: React.FormEvent<HTMLElement>): void;
  // Callback when button becomes focussed.
  onFocus?(): void;
  // Callback when focus leaves button.
  onBlur?(): void;
  // Add title to button
  title?:string;
}

const button = ({
  url,
  disabled = false,
  children,
  accessibilityLabel,
  onClick,
  onFocus,
  onBlur,
  external = false,
  icon,
  primary = false,
  outline = false,
  destructive = false,
  disclosure = false,
  plain = false,
  name,
  submit = false,
  componentSize,
  fullWidth = false,
  componentStyle,
  componentClass,
  componentId = '',
  theme,
  iconPosition = false,
  title,
}: Props) => {
  const className = classNames(
    theme.button,
    componentClass,
    primary && theme.primary,
    outline && theme.outline,
    destructive && theme.destructive,
    disabled && theme.disabled,
    plain && theme.plain,
    componentSize && theme[variationName('size', componentSize)],
    fullWidth && theme.fullWidth,
    icon && children == null && theme.iconOnly
  );

  const disclosureIconMarkup = disclosure
    ? <span className={theme.customIcon}><Icon source="caretDown" /></span>
    : null;

  const iconMarkup = icon
    ? <span className={theme.customIcon}>
        <Icon source={icon} />
        {accessibilityLabel && <VisuallyHidden>{accessibilityLabel}</VisuallyHidden> || title && <VisuallyHidden>{title}</VisuallyHidden>}
      </span>
    : null;

  const childMarkup = children ? <span>{children}</span> : null;

  const content = iconMarkup || disclosureIconMarkup
    ? !iconPosition ? (
      <span className={theme.content}>
        {iconMarkup}
        {childMarkup}
        {disclosureIconMarkup}
      </span>
    ) : (
        <span className={theme.content}>
          {childMarkup}
          {iconMarkup}
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
          style={componentStyle}
          title={title}
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
          name={name}
          aria-label={accessibilityLabel}
          style={componentStyle}
          id={componentId}
          title={title}
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
