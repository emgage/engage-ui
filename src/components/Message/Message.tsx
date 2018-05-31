import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { MESSAGE } from '../ThemeIdentifiers';
import * as baseTheme from './Message.scss';

export interface Props {
  // Text or any react component to render inside message component.
  children?: React.ReactNode;
  // To display, if message is visible or not
  isVisible?: boolean;
  // To maintain identity for message.
  customId: string;
  // To apply style externally for this component
  customStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
}

class Message extends React.Component<Props, {}> {
  render() {
    const { children, isVisible, customId, customStyle, theme } = this.props;

    if (!isVisible) {
      // TODO This seems to be a bug. We want to return null.
      return <noscript />;
    }

    return (
      <div id={customId} className={theme.messageBlock} style={customStyle} role="alert" aria-live="polite">
        <span className={theme.messagePrompt}>
          {children}
        </span>
      </div>
    );
  }
}

export default themr(MESSAGE, baseTheme)(Message) as ThemedComponentClass<Props, {}>;
