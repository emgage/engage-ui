import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';

import Icon, { IconColor, IconList } from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { BADGE } from '../ThemeIdentifiers';

import * as baseTheme from './Badge.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning' | 'new' | 'draft' | 'working' | 'published' | 'archive' | 'archived' | 'delete' | 'deleted' | 'locked';
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
  // Add an icon to the badge.
  icon?: boolean;
  // Component can show any icon by passing the source
  iconSource?: keyof typeof IconList;
  // Change the icon color
  iconColor?: IconColor;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
  // Set a custom class
  componentClass?: string;
  // Unique Id
  componentId?: string;
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
  new: 'New',
  draft: 'Draft',
  working: 'Working',
  published: 'Published',
  archive: 'Archive',
  archived: 'Archived',
  delete: 'Delete',
  deleted: 'Deleted',
  locked: 'Locked',
};

const badge = ({
  children,
  status,
  progress,
  working = false,
  theme,
  icon = false,
  iconSource = 'lock',
  iconColor = 'inkLighter',
  componentClass = '',
  componentStyle,
  componentId = '',
}: Props) => {
  const className = classNames(
    componentClass,
    theme.badge,
    status && theme[variationName('status', status)],
    progress && theme[variationName('progress', progress)]
  );

  const statusLabelMarkup = status
    ? <VisuallyHidden theme={theme}>{STATUS_LABELS[status]}</VisuallyHidden>
    : null;

  const pipMarkup = progress
    ? (
      <span className={theme.pip}>
        <VisuallyHidden theme={theme}>{PROGRESS_LABELS[progress]}</VisuallyHidden>
      </span>
    )
    : null;

  const iconMarkup = icon
    ? (
    <span className={theme.iconWrapper}>
      <Icon componentColor={iconColor} source={iconSource} />
    </span>
  )
  : null;

  const workingMarkup = working
  ? (
    <span className={theme.working}>
      <Icon source="refresh" componentColor="inkLighter" theme={theme} />
    </span>
  )
  : null;

  return (
    <span className={className} style={componentStyle} id={componentId} >
      {statusLabelMarkup}
      {workingMarkup}
      {pipMarkup}
      {iconMarkup}
      {children}
    </span>
  );
};

export default themr(BADGE, baseTheme)(badge) as ThemedComponentClass<Props, {}>;
