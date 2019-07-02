import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import Icon from '../Icon';
import { TAG } from '../ThemeIdentifiers';

import * as baseTheme from './Tag.scss';

export interface Props {
  // Content to display in the tag.
  children?: string;
  // Theme to be injected via css-themr.
  theme?: any;
  // Callback when tag is removed.
  onRemove?(): void;
}

const tag = ({ children, onRemove, theme }: Props) => {
  return (
    <span className={theme.tag}>
      <span>{children}</span>
      <button
        aria-label="Remove"
        className={theme.button}
        onClick={onRemove}
        onMouseUp={handleMouseUp}
      >
        <Icon source="cancelSmall" theme={theme} />
      </button>
    </span>
  );
};

function handleMouseUp({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
  currentTarget.blur();
}

export default themr(TAG, baseTheme)(tag) as ThemedComponentClass<Props, {}>;
