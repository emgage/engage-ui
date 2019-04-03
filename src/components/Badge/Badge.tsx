import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { BADGE } from '../ThemeIdentifiers';

import * as baseTheme from './Badge.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning';
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export interface Props {
  // The content to display inside the badge
  children?: React.ReactNode;
  // Set the color of the badge for the given status. It can be success, info, attention or warning.
  status?: Status;
  // Show the progress of badge using round indicator. It can be incomplete, partiallyComplete or complete
  progress?: Progress;
  // Show the working status of badge using spinning indicator.
  working?: boolean;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
  componentClass?: string;
  // Theme to be injected via css-themr
  theme?: any;
}

const PROGRESS_LABELS = {
  incomplete: 'Incomplete',
  partiallyComplete: 'Partially complete',
  complete: 'Complete',
};

const STATUS_LABELS = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  attention: 'Attention',
};

const badge = ({ children, status, progress, working, theme, componentClass = '', componentStyle }: Props) => {
  const className = classNames(
    componentClass,
    theme.badge,
    status && theme[variationName('status', status)],
    progress && theme[variationName('progress', progress)]
  );

  const statusLabelMarkup = status
    ? <VisuallyHidden>{STATUS_LABELS[status]}</VisuallyHidden>
    : null;

  const pipMarkup = progress
    ? (
      <span className={theme.pip}>
        <VisuallyHidden>{PROGRESS_LABELS[progress]}</VisuallyHidden>
      </span>
    )
    : null;

  const workingMarkup = working
  ? (
    <span className={theme.working}>
      <Icon source="refresh" componentColor="inkLighter" />
    </span>
  )
  : null;

  return (
    <span className={className} style={componentStyle}>
      {statusLabelMarkup}
      {workingMarkup}
      {pipMarkup}
      {children}
    </span>
  );
};

export default themr(BADGE, baseTheme)(badge) as ThemedComponentClass<Props, {}>;
