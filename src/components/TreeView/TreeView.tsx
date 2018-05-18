import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
// import { classNames } from '@shopify/react-utilities/styles';

import { SourceData } from './interface';
import TreeNode from './TreeNode';
import { TREEVIEW } from '../ThemeIdentifiers';

import * as baseTheme from './TreeView.scss';

// There could be multiple themes, but right now lets take only a basic theme
type Themes = 'basic';

export interface Props {
  selectedTheme?: Themes;
  source: SourceData[];
  theme?: any;
}

export interface State {
  source: SourceData[];
}

class TreeView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      source: this.props.source,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    // If treenodes are changed or deleted or added new then it should render again
    if (!Object.is(newProps.source, this.props.source)) {
      this.setState({ source: newProps.source });
    }
  }

  // Set the active or inactive status of node
  toggleNode = (id: number) => {
    const { source } = this.props;

    source.some((item: SourceData): any => {
      if (item.id === id) {
        item.active = !item.active;
        // Call the toggle callback if available
        if (item.onToggle) {
          item.onToggle(item.active);
        }

        this.setState({ source });
        return true;
      }

      // If current node have children then search this id in child node
      if (item.children) {
        if (this.toggleChildNode(item.children, id)) {
          this.setState({ source });
          return true;
        }
      }
    });
  }

  // Set child nodes active or inactive status
  toggleChildNode = (source: SourceData[], id: number) => {
    return source.some((item: SourceData): any => {
      if (item.id === id) {
        item.active = !item.active;
        // Call the toggle callback if available
        if (item.onToggle) {
          item.onToggle(item.active);
        }

        return true;
      }

      // Recursive if child node contains another child node
      if (item.children) {
        this.toggleChildNode(item.children, id);
      }
    });
  }

  // Render single node, also iterate through its children & render those as well if its parent active status is true
  renderNode = (item: SourceData): any => {
    // Current node aka parent node
    const node = (
      <li key={item.id}>
        {
          item.children ?
          <span onClick={() => this.toggleNode(item.id)}>
            {item.active ? '-' : '+'}
          </span> : null
        }

        <TreeNode { ...item } />
      </li>
    );

    // Check if current node have any children node
    // Render those only if parent's node active status is true
    // If children node further finds its child node it will recurse through the list
    if (item.children && item.active) {
      return (
        <li key={item.id}>
          <span onClick={() => this.toggleNode(item.id)}>
            {item.active ? '-' : '+'}
          </span>
          <TreeNode { ...item } />

          <ul>
            { item.children.map((childItem: SourceData) => this.renderNode(childItem)) }
          </ul>
        </li>
      );
    }

    return node;
  }

  render() {
    const { source } = this.state;

    return (
      <ul>
        { source.map(item => this.renderNode(item)) }
      </ul>
    );
  }
}

export default themr(TREEVIEW, baseTheme)((TreeView)) as ThemedComponentClass<Props, State>;
