import * as React from 'react';
import { themr } from 'react-css-themr';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import VisuallyHidden from '../VisuallyHidden';
import { BADGE } from '../ThemeIdentifiers';

import * as baseTheme from './Badge.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning';
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export interface Props {
  children?: string,
  status?: Status,
  progress?: Progress,
  theme?: any,
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

const Badge = ({children, status, progress, theme}: Props) => {
  const className = classNames(
    theme.Badge,
    status && theme[variationName('status', status)],
    progress && theme[variationName('progress', progress)],
  );

  const pipMarkup = progress
    ? (
      <span className={theme.Pip}>
        <VisuallyHidden>{PROGRESS_LABELS[progress]}</VisuallyHidden>
      </span>
    )
    : null;

  const statusLabelMarkup = status
    ? <VisuallyHidden>{STATUS_LABELS[status]}</VisuallyHidden>
    : null;

  return (
    <span className={className}>
      {statusLabelMarkup}
      {pipMarkup}
      {children}
    </span>
  );
}

export default themr(BADGE, baseTheme)(Badge);