import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { SourceData } from './interface';
import TreeNode from './TreeNode';
import { TREEVIEW } from '../ThemeIdentifiers';
import Icon, { IconColor }  from '../Icon';
import * as baseTheme from './TreeView.scss';

// There could be multiple themes, but right now lets take only a basic theme
type Themes = 'basic';

export interface Props {
  iconColor?: IconColor;
  // To set defult theme for Treeview.
  selectedTheme?: Themes;
  // Datasource to bind into treeview component
  source: SourceData[];
  // Theme to be injected via css-themr.
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
    if (JSON.stringify(newProps.source) !== JSON.stringify(this.props.source)) {
      this.setState({ source: newProps.source });
    }
  }

  // Set the active or inactive status of node
  toggleNode = (id: number) => {
    const { source } = this.state;

    source.some((item: SourceData): boolean => {
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
        item.children = this.toggleChildNode(item.children, id);
        this.setState({ source });
        return true;
      }

      return false;
    });
  }

  // Set child nodes active or inactive status
  toggleChildNode = (thisSource: any, id: number) => {
    for (let key = 0; key < thisSource.length; key++) {
      if (thisSource[key].id === id) {
        thisSource[key].active = !thisSource[key].active;

        // Call the toggle callback if available
        if (thisSource[key].onToggle) {
          thisSource[key].onToggle(thisSource[key].active);
        }
      }

      // Recursive if child node contains another child node
      if (thisSource[key].children) {
        thisSource[key].children = this.toggleChildNode(thisSource[key].children, id);
      }
    }

    return thisSource;
  }

  // Render single node, also iterate through its children & render those as well if its parent active status is true
  renderNode = (item: SourceData): React.ReactNode => {
    const { iconColor = 'black' } = this.props;
    const iconStyle = {
      display: 'inline-block',
      width: '1.5rem',
      height: '1.5rem',
    };

    // Current node aka parent node
    const node = (
      <li key={item.id}>
        {
          item.children ?
          <span onClick={() => this.toggleNode(item.id)}>
            {item.active ? <Icon componentStyle={iconStyle} componentColor={iconColor} source="circleChevronDown" /> : <Icon componentColor={iconColor} componentStyle={iconStyle} source="circleChevronRight" />}
          </span> :
          <span> <Icon componentStyle={iconStyle} componentColor={iconColor} source="circleFilled" /> </span>
        }

        <span className={this.props.theme.treeviewSpan}><TreeNode { ...item } /></span>
      </li>
    );

    // Check if current node have any children node
    // Render those only if parent's node active status is true
    // If children node further finds its child node it will recurse through the list
    if (item.children && item.active) {
      return (
        <li key={item.id}>
          <span onClick={() => this.toggleNode(item.id)}>
            {item.active ? <Icon componentStyle={iconStyle} componentColor={iconColor} source="circleChevronDown" /> : <Icon componentStyle={iconStyle} componentColor={iconColor} source="circleChevronRight" />}
          </span>
          <span className={this.props.theme.treeviewSpan}><TreeNode { ...item } /></span>

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
    const { theme } = this.props;

    return (
      <ul className={theme.treeview}>
        { source.map(item => this.renderNode(item)) }
      </ul>
    );
  }
}

export default themr(TREEVIEW, baseTheme)((TreeView)) as ThemedComponentClass<Props, State>;
