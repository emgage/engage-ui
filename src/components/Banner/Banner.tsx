import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import { Action } from '../../types';
import Button, { buttonFrom } from '../Button';
import Heading from '../Heading';
import ButtonGroup from '../ButtonGroup';
import UnstyledLink from '../UnstyledLink';
import Icon, { Props as IconProps } from '../Icon';
import { BANNER } from '../ThemeIdentifiers';

import * as baseTheme from './Banner.scss';

import circleCheckMarkSvg from './icons/circle-check-mark.svg';
import flagSvg from './icons/flag.svg';
import circleAlertSvg from './icons/circle-alert.svg';
import circleBarredSvg from './icons/circle-barred.svg';
import confettiSvg from './icons/confetti.svg';

export type Status = 'success' | 'info' | 'warning' | 'critical';

export interface Props {
  icon?: IconProps['source'];
  title?: string;
  status?: Status;
  action?: Action;
  secondaryAction?: Action;
  children?: React.ReactNode;
  theme?: any;
  onDismiss?(): void;
}

const banner = ({
  icon,
  action,
  secondaryAction,
  title,
  children,
  status,
  onDismiss,
  theme,
}: Props) => {
  let color: IconProps['color'];
  let defaultIcon: IconProps['source'];

  switch (status) {
    case 'success':
      color = 'greenDark';
      defaultIcon = circleCheckMarkSvg;
      break;
    case 'info' :
      color = 'tealDark';
      defaultIcon = flagSvg;
      break;
    case 'warning':
      color = 'yellowDark';
      defaultIcon = circleAlertSvg;
      break;
    case 'critical':
      color = 'redDark';
      defaultIcon = circleBarredSvg;
      break;
    default:
      color = 'ink';
      defaultIcon = confettiSvg;
  }

  const className = classNames(
    theme.banner,
    status && theme[variationName('status', status)],
    onDismiss && theme.hasDismiss,
  );

  const id = uniqueID();
  const iconName = icon || defaultIcon;

  let headingMarkup: React.ReactNode = null;
  let headingID: string | undefined;

  if (title) {
    headingID = `${id}Heading`;
    headingMarkup = (
      <div className={theme.heading} id={headingID}>
        <Heading element="p">{title}</Heading>
      </div>
    );
  }

  const secondaryActionMarkup = secondaryAction
    ? secondaryActionFrom(secondaryAction, theme)
    : null;

  const actionMarkup = action
    ? (
      <div className={theme.Actions}>
        <ButtonGroup>
          {buttonFrom(action, { outline: true })}
          {secondaryActionMarkup}
        </ButtonGroup>
      </div>
    )
    : null;

  let contentMarkup = null;
  let contentID: string | undefined;

  if (children || actionMarkup) {
    contentID = `${id}Content`;
    contentMarkup = (
      <div className={theme.content} id={contentID}>
        {children}
        {actionMarkup}
      </div>
    );
  }

  const dismissButton = onDismiss
    ? (
      <div className={theme.dismiss}>
        <Button plain icon="cancelSmall" accessibilityLabel="Dismiss notification" />
      </div>
    )
    : null;

  return (
    <div
      className={className}
      tabIndex={0}
      role={`banner ${status}`}
      aria-labelledby={headingID}
      aria-describedby={contentID}
    >
      {dismissButton}
      <div className={theme.ribbon}>
        <Icon source={iconName} color={color} backdrop />
      </div>
      <div>
        {headingMarkup}
        {contentMarkup}
      </div>
    </div>
  );
};

let index = 1;
function uniqueID() {
  return `banner${index += 1}`;
}

function secondaryActionFrom(action: Action, theme: any) {
  if (action.url) {
    return (
      <UnstyledLink className={theme.secondaryAction} url={action.url}>
        <span className={theme.text}>{action.content}</span>
      </UnstyledLink>
    );
  }

  return (
    <button className={theme.secondaryAction} onClick={action.onAction}>
      <span className={theme.text}>{action.content}</span>
    </button>
  );
}

export default themr(BANNER, baseTheme)(banner) as ThemedComponentClass<Props, {}>;
