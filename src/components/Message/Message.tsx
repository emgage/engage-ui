import * as React from 'react';
import { themr } from 'react-css-themr';

import { MESSAGE } from '../ThemeIdentifiers';
import * as baseTheme from './Message.scss';

export interface Props {
  children?: React.ReactNode,
  isVisible?: boolean,
  id: string,
  theme?: any,
}

const Message = ({children, isVisible, id, theme}: Props) => {
  if (!isVisible) {
    // TODO This seems to be a bug. We want to return null.
    return <noscript />;
  }

  return (
    <div id={id} className={theme.messageBlock} role="alert" aria-live="polite">
      <span className={theme.messagePrompt}>
        {children}
      </span>
    </div>
  );
}

export default themr(MESSAGE, baseTheme)(Message);