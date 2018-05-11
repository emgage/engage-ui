import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
// import { classNames } from '@shopify/react-utilities/styles';

import { SourceData as Props } from './interface';
import { TREEVIEW } from '../ThemeIdentifiers';

import * as baseTheme from './TreeView.scss';

class TreeNode extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  renderNode = (): any => {
    const { label = '' } = this.props;

    return label;
  }

  render() {
    const { component = this.renderNode } = this.props;
    return component();
  }
}

export default themr(TREEVIEW, baseTheme)((TreeNode)) as ThemedComponentClass<Props, {}>;
