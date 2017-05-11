import * as React from 'react';
import { themr } from 'react-css-themr';
import autobind from '@shopify/javascript-utilities/autobind';
import EventListener from '../EventListener';

import { TEXTFIELD } from '../ThemeIdentifiers';
import * as baseTheme from './TextField.scss';

export interface Props {
  theme?: any,
  contents?: string,
  currentHeight?: number | null,
  minimumLines?: number,
  onHeightChange(height: number): void,
}

class Resizer extends React.PureComponent<Props, never> {
  private contentNode: HTMLElement;
  private minimumLinesNode: HTMLElement;

  componentDidMount() {
    this.handleHeightCheck();

    if (process.env.NODE_ENV === 'development') {
      // We need to defer the calculation in development so the
      // styles have time to be injected.
      setTimeout(this.handleHeightCheck, 0);
    }
  }

  componentDidUpdate() {
    this.handleHeightCheck();
  }

  render() {
    const {contents, minimumLines} = this.props;

    const minimumLinesMarkup = minimumLines
      ? (
        <div
          ref={this.setMinimumLinesNode}
          className={this.props.theme.DummyInput}
          dangerouslySetInnerHTML={{__html: getContentsForMinimumLines(minimumLines)}}
        />
      )
      : null;

    return (
      <div aria-hidden className={this.props.theme.Resizer}>
        <EventListener event="resize" handler={this.handleHeightCheck} />
        <div
          ref={this.setContentNode}
          className={this.props.theme.DummyInput}
          dangerouslySetInnerHTML={{__html: getFinalContents(contents)}}
        />
        {minimumLinesMarkup}
      </div>
    );
  }

  @autobind
  private handleHeightCheck() {
    const contentHeight = this.contentNode.offsetHeight;
    const minimumHeight = this.setMinimumLinesNode ? this.minimumLinesNode.offsetHeight : 0;
    const newHeight = Math.max(contentHeight, minimumHeight);

    const {currentHeight, onHeightChange} = this.props;

    if (newHeight !== currentHeight) {
      onHeightChange(newHeight);
    }
  }

  @autobind
  private setContentNode(node: HTMLElement) {
    this.contentNode = node;
  }

  @autobind
  private setMinimumLinesNode(node: HTMLElement) {
    this.minimumLinesNode = node;
  }
}

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
};

const REPLACE_REGEX = /[\n&<>]/g;

function replaceEntity(entity: keyof typeof ENTITIES_TO_REPLACE) {
  return ENTITIES_TO_REPLACE[entity] || entity;
}

function getContentsForMinimumLines(minimumLines: number) {
  let content = '';

  for (let line = 0; line < minimumLines; line++) {
    content += '<br>';
  }

  return content;
}

function getFinalContents(contents?: string) {
  return contents
    ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
    : '<br>';
}

export default themr(TEXTFIELD, baseTheme)(Resizer);