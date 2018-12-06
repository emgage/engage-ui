import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { classNames } from '@shopify/react-utilities/styles';
import { Props as ButtonProps } from '../Button';

import { BUTTON_GROUP } from '../ThemeIdentifiers';
import * as baseTheme from './ButtonGroup.scss';

export interface Props {
  button: React.ReactElement<ButtonProps>;
  theme?: any;
}

export interface State {
  focused: boolean;
}

class Item extends React.PureComponent<Props, State> {
  state: State = { focused: false };

  render() {
    const { button, theme } = this.props;
    const { focused } = this.state;

    const className = classNames(
      theme.item,
      focused && theme['Item-focused'],
      button.props.plain && theme['Item-plain']
    );

    return (
      <div
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {button}
      </div>
    );
  }

  @autobind
  private handleFocus() {
    this.setState({ focused: true });
  }

  @autobind
  private handleBlur() {
    this.setState({ focused: false });
  }
}

export default themr(BUTTON_GROUP, baseTheme)(Item);
