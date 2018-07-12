
import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import { FlexBox } from '..';
import { Drawer, DrawerContent } from '../Drawer';
import Tooltip from '../Tooltip';
import Accordion, { AccordionItemProps }from '../Accordion';

import { SIDENAVIGATION } from '../ThemeIdentifiers';
import * as baseTheme from './SideNavigation.scss';

// All items config properties
export interface INavigationData {
  id?:number;
  label?:React.ReactNode;
  icon?:React.ReactNode;
  divider?:boolean | null;
  children?:React.ReactNode;
  action?(arg?:string|number|boolean|null):void | null;
}

// All prototypes type
export interface Props {
  // Set theme for SideNavigation
  theme?: any;
  // Set accordian for child items or not
  accordian: boolean;
  // Set active item
  activeItem?:number | null;
  // Source property for items config
  source: INavigationData[];
  // Set drawer open or close
  drawerOpen: boolean;
  // Hide or show collapse icon
  hideCollapse: boolean;
  // Show drawer in expanded or collapsed state
  drawerExpand: boolean;
  // Custom drawer style
  drawerStyle?: any;
}

export interface State {
  // state for drawer id to be set icons or full content
  activeDrawerId: string;
}

// SideNavigation component, in here wrap all other required components or DOM for the SideNavigation
class SideNavigation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // As per props value set the drawer id to be active
      activeDrawerId: this.props.drawerExpand ? 'fullContent' : 'collapsedContent',
    };
  }

  componentDidUpdate() {
    // Set style for body elemnt
    const bodyElement = document.body;
    if (bodyElement !== null) {
      bodyElement.className +=  this.props.drawerOpen ? ' ' + this.props.theme.container : '';
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.drawerExpand !== this.props.drawerExpand) {
      this.setState({ activeDrawerId: newProps.drawerExpand ? 'fullContent' : 'collapsedContent' });
    }
  }

  toggleDrawerContent = () => {
    const drawerContentId = this.state.activeDrawerId === 'fullContent' ? 'collapsedContent' : 'fullContent';
    this.setState({ activeDrawerId: drawerContentId });
  }

  render() {
    const { source, theme, accordian, drawerOpen, hideCollapse, activeItem, drawerStyle } = this.props;
    const { collapseLink, li: liClass, childLi: childLiClass } = theme;
    const { activeDrawerId } = this.state;

    // Iterate through source config items and set markup when full content is displayed
    const fullContentMarkup = source.map((full: any, index: number) => {
      const childrenMarkup = full.children !== undefined || null ? full.children.map((child: any, index: number) => {
        return (
          <div key={index}>
            <a className={childLiClass} onClick={child.action} aria-disabled={false}>
              <Icon source={child.icon} componentColor="white" />
              {child.label}
            </a>
          </div>
        );
      }) : null;

      // Set Accordian Item properties
      const items : AccordionItemProps[] = [{
        children: childrenMarkup,
        header:
          <div
            key={index}
            className={liClass}
          >
            <div className={liClass} onClick={full.action} aria-disabled={false}>
              <Icon source={full.icon} componentColor={activeItem === full.id ? 'black' : 'white'} />
              {full.label}
            </div>
          </div>
      }];

      // Set markup based on the prop values
      const markup = accordian ? (childrenMarkup ==  null ?
        (
          <div key={index}>
            <div className={liClass} onClick={full.action} aria-disabled={false}>
              <Icon source={full.icon} componentColor={activeItem === full.id ? 'black' : 'white'}/>
              {full.label}
            </div>

            {childrenMarkup}
          </div>
        ) : <Accordion key={index} style={{ padding:'0px', height:'20px' }} mode="collapsible" items={items} />) :
        (
          <div key={index}>
            <div className={liClass} onClick={full.action} aria-disabled={false}>
              <Icon source={full.icon} componentColor={activeItem === full.id ? 'black' :'white'} />
              {full.label}
            </div>

            {childrenMarkup}
          </div>
        );

      const singleItem = classNames(
        theme.listItem,
        activeItem === full.id && theme.active,
        full.divider && theme.divider
      );

      return (
        <div key={full.id} className={singleItem}>
          {markup}
        </div>
      );
    });

    // Set markup when only icons need to be shown in collapsed state
    const collapsedContentMarkup = source.map((col:any) => {
      const singleItem = classNames(
        theme.listItem,
        activeItem === col.id && theme.active,
        col.divider && theme.divider
      );

      return (
        <div key={col.id} className={singleItem}>
          <Tooltip content={col.label}>
            <div className={liClass} onClick={col.action} aria-disabled={false}>
              <Icon source={col.icon} componentColor={activeItem === col.id ? 'black' : 'white'} />
            </div>
          </Tooltip>
        </div>
      );
    });

    const collapseIcon = activeDrawerId === 'fullContent' ? 'chevronLeft' : 'chevronRight';
    const collapseIconMarkup = (!hideCollapse) ?
      <div
        className={collapseLink}
        onClick={this.toggleDrawerContent}
      >
        <FlexBox>
          <Icon source={collapseIcon} componentColor="white" />
          { activeDrawerId === 'fullContent' ? 'Collapse' : ''}
        </FlexBox>
      </div>
      : null;

    // Return div with drawer component having the side navigation items wrapped in drawer content component
    return (
      <div>
        <Drawer
          active={drawerOpen}
          activeContentId={this.state.activeDrawerId}
          currentTheme="dark"
          mode="push"
          componentWidth={activeDrawerId === 'collapsedContent' ? 'collapsed' : 'small'}
          style={drawerStyle}>
          <DrawerContent
            componentId="fullContent"
            mode="slide"
          >
            {collapseIconMarkup}

            <div className={this.props.theme.list}>
              {fullContentMarkup}
            </div>
          </DrawerContent>

          <DrawerContent
            componentId="collapsedContent"
            mode="slide"
          >
            {collapseIconMarkup}

            <div className={this.props.theme.list} >
              {collapsedContentMarkup}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}

export default themr(SIDENAVIGATION, baseTheme)(SideNavigation) as ThemedComponentClass<Props, {}>;
