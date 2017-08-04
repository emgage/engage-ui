import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { MESSAGE } from '../ThemeIdentifiers';
import * as baseTheme from './Message.scss';

export interface Props {
  children?: React.ReactNode;
  isVisible?: boolean;
  id: string;
  style?: React.CSSProperties;
  theme?: any;
}

class Message extends React.Component<Props, {}> {
  render() {
    const { children, isVisible, id, style, theme } = this.props;

    if (!isVisible) {
      // TODO This seems to be a bug. We want to return null.
      return <noscript />;
    }

    return (
      <div id={id} className={theme.messageBlock} style={style} role="alert" aria-live="polite">
        <span className={theme.messagePrompt}>
          {children}
        </span>
      </div>
    );
  }
}

export default themr(MESSAGE, baseTheme)(Message) as ThemedComponentClass<Props, {}>;
