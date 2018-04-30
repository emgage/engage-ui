import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { TAB } from '../ThemeIdentifiers';
import * as baseTheme from './Tab.scss';

/* Position of Tabs in panel
  // top - tab panel will be shown at a top of content
  // bottom - tab panel will be shown at a bottom of content
  // left - tab panel will be shown at a left of content
  // right - tab panel will be shown at a right of content
*/
export type Position = 'top' | 'bottom' | 'left' | 'right';

/* Alignment of tabs in panel
  // left - tabs alignment starting from left side
  // center - tabs alignment will be in center
  // right - tabs alignment starting from right side
*/
export type Alignment = 'left' | 'center' | 'right';

// All prototypes type
export interface Props {
  // Children are the tabs and it's content
  children?: any;
  // Position prop defines the tab's location with reference to it's content
  position: Position;
  // Alignment prop defines the tab's Alignment in tab panel
  alignment: Alignment;
  // For Default active tab
  defaulttabid?: string;
  // Set theme for TabPanel
  theme?: any;
}

export interface State {
  // For maintaing current active tab
  activeTabId: string;
}

// TabPanel component bind multiple/single tab and it's content in it.
class TabPanel extends React.Component<Props, State> {

  componentWillReceiveProps(newProps: any) {
    // Call the callback function if available
    // Maintain state while trigger active tab, calling from outside's component (like triggered from external button click)
    this.setState({
      activeTabId: newProps.defaulttabid
    });
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      // Maintain Active status of Tab
      activeTabId: props.defaulttabid ? props.defaulttabid : props.children[0].props.tabId,
    };

  }

  // This will render single/multiple tabs into panel with props
  renderTabs() {
    const { activeTabId } = this.state;
    // Iterate through a list of tabs and bind onclick event respectively
    return React.Children.map(this.props.children, (child: React.ReactElement<any>, index) => {
      return React.cloneElement(child, {
        activeTabId,
        onClick: this.onTabClick.bind(this, this.props.children[index].props.tabId),
      });
    });
  }

  // Render content for the selected tab
  renderActivetabContent() {
    const { children } = this.props;
    const activeContent = children.filter((item: any) => item.props.tabId === this.state.activeTabId);
    return activeContent[0].props.children;
  }

  // Render Tab and TabContent togeather in TabPanel
  render() {
    const { theme, position, alignment } = this.props;

    // Combination of classes required to bind for location prop
    const locationClassName = classNames(
      theme.tabpanel,
      position === 'top' && theme.top,
      position === 'bottom' && theme.bottom,
      position === 'left' && theme.left,
      position === 'right' && theme.right
    );

    // Combination of class required to bind for alignment prop
    const alignmentClassName = classNames(
      theme.tabstrip,
      alignment === 'left' && theme.start,
      alignment === 'center' && theme.center,
      alignment === 'right' && theme.end
    );

    return (
      <div {...this.props} className={locationClassName}>
        <div className={alignmentClassName}>
          {this.renderTabs()}
        </div>
        <div className={theme.cardct}>
          {this.renderActivetabContent()}
        </div>
      </div>
    );
  }

  // Handle OnClick event whenever Tab is cliked/selected 
  onTabClick(activeTabId: string) {
    this.setState({
      activeTabId
    });
  }
}

export default themr(TAB, baseTheme)(TabPanel) as ThemedComponentClass<Props, State>;
