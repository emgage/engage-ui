import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { SourceData as Props } from './interface';
import { TREEVIEW } from '../ThemeIdentifiers';

import * as baseTheme from './TreeView.scss';

class TreeNode extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  renderNode = (): React.ReactNode => {
    const { label = '' } = this.props;

    return label;
  }

  render() {
    // If component prop is not present then check for label & render that
    const { component = this.renderNode } = this.props;
    return component();
  }
}

export default themr(TREEVIEW, baseTheme)((TreeNode)) as ThemedComponentClass<Props, {}>;
