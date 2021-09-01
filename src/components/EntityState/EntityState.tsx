import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Icon, { IconColor, IconList } from '../Icon';
import { ENTITYSTATE } from '../ThemeIdentifiers';

import * as baseTheme from './EntityState.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning' | 'new' | 'draft' | 'working' | 'published' | 'archive' | 'archived' | 'delete' | 'deleted' | 'locked';
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

interface IComonEnum {
  itemName: string;
  itemID: number;
}
interface Item {
  processing?: string;
  pendingAction?: IComonEnum;
  entityState: IComonEnum;
  locked: IComonEnum;
  [key: string]: any;
}

export interface Props {
  item: Item;
  // hideIcon or not
  hideLabel?: boolean;
  // hideIcon or not
  hideIcon?: boolean;
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

const EntityState = ({
  item,
  theme,
  hideIcon = false,
  hideLabel = false,
  iconSource,
  iconColor = 'inkLighter',
  componentClass = '',
  componentStyle,
  componentId = '',
}: Props) => {

  const { processing, entityState, pendingAction, locked } = item;
  const className = classNames(
    componentClass,
    theme.entityState
  );
  let label = processing || '';
  let iconItemId;
  if (!processing) {
    if (locked && locked.itemID === 0) {
      if (pendingAction && (!['None', 'Create'].includes(pendingAction.itemName))) {
        label = pendingAction.itemName;
        iconItemId = pendingAction.itemID;
      } else {
        label = entityState.itemName;
        iconItemId = entityState.itemID;
      }
    } else if (locked && locked.itemID === 1) {
      label = locked.itemName;
      iconItemId = 9;
    }
  }
  let newIconSource: keyof typeof IconList | undefined = iconSource;
  let iconComponentClass: string = '';
  if (!hideIcon && !iconSource) {
    if (processing) {
      newIconSource = 'refresh';
      iconComponentClass = theme.processingState;
    } else {
      if (iconItemId === 1) {
        newIconSource = 'add';
        iconComponentClass = theme.newState;
      } else if (iconItemId === 2) {
        newIconSource = 'pen';
        iconComponentClass = theme.draftState;
      } else if (iconItemId === 3) {
        newIconSource = 'export'; // need to change icon
        iconComponentClass = theme.archiveState;
      } else if (iconItemId === 4) {
        newIconSource = 'circleCancel'; // need to change icon
        iconComponentClass = theme.deleteState;
      } else if (iconItemId === 5) {
        newIconSource = 'checkCircle';
        iconComponentClass = theme.publishedState;
      } else if (iconItemId === 6) {
        newIconSource = 'export'; // need to change icon
        iconComponentClass = theme.archivedState;
      } else if (iconItemId === 7) {
        newIconSource = 'circleCancel';
        iconComponentClass = theme.deletedState;
      } else if (iconItemId === 8) {
        newIconSource = 'refresh';
        iconComponentClass = theme.processingState;
      } else if (iconItemId === 9) {
        newIconSource = 'lock';
        iconComponentClass = theme.lockedState;
      }
    }
  }

  // new = 1,
  // draft = 2,
  // archive = 3,
  // delete = 4,
  // published = 5,
  // archived = 6,
  // deleted = 7,
  // working = 8,
  // locked = 9,

  const iconMarkup = newIconSource && (
    <span className={theme.iconWrapper}>
      <Icon
        componentColor={iconColor}
        source={newIconSource}
        componentClass={classNames(theme.iconState, iconComponentClass)}
      />
    </span>
  );

  return (
    <span className={className} style={componentStyle} id={componentId} >
      {!hideIcon && iconMarkup}
      {!hideLabel && label}
    </span>
  );
};

export default themr(ENTITYSTATE, baseTheme)(EntityState) as ThemedComponentClass<Props, {}>;
