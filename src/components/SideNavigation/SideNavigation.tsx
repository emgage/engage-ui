
import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import { FlexBox } from '../';
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
  parentDivider?:boolean | null;
  currentApp?:boolean | null;
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
  // Unique ID
  componentId?: string;
  // Handle Collapse of sidebar
  onCollapse?(value: boolean): void;
}

export interface State {
  // state for drawer id to be set icons or full content
  activeDrawerId: string;
  popoverActive2: boolean;
  anchorEl2?: HTMLElement;
}

// SideNavigation component, in here wrap all other required components or DOM for the SideNavigation
class SideNavigation extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // As per props value set the drawer id to be active
      popoverActive2: false,
      activeDrawerId: this.props.drawerExpand ? 'fullContent' : 'collapsedContent',
    };
  }

  popoverUpdate2 = (e: any) => {
    this.setState({
      popoverActive2 : !this.state.popoverActive2,
      anchorEl2: e ? e.currentTarget as HTMLElement : this.state.anchorEl2
    });
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
    this.setState({ activeDrawerId: drawerContentId }, () => {
      if (this.props.onCollapse) {
        this.props.onCollapse(this.state.activeDrawerId === 'collapsedContent');
      }
    });
  }

  render() {
    const { source, theme, accordian, drawerOpen, hideCollapse, activeItem, drawerStyle, componentId = '' } = this.props;
    const { collapseLink, li: liClass, childLi: childLiClass } = theme;
    const { activeDrawerId } = this.state;

    // Iterate through source config items and set markup when full content is displayed
    const fullContentMarkup = source.map((full: any, index: number) => {
      const childrenMarkup = full.children !== undefined || null ? full.children.map((child: any, index: number) => {
        return (
          <div key={index}>
            <a className={childLiClass} onClick={child.action} aria-disabled={false} id={componentId ? `${componentId}${child.label}` : ''}>
              <Icon source={child.icon} componentColor="white" componentClass={theme.customIcon} theme={theme} />
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
            <div className={liClass} onClick={full.action} aria-disabled={false} id={componentId ? `${componentId}${full.label}` : ''}>
              <Icon source={full.icon} componentColor={activeItem === full.id ? 'black' : 'white'} componentClass={theme.customIcon} theme={theme} />
              {full.label}
            </div>
          </div>
      }];

      // Set markup based on the prop values
      const markup = accordian ? (childrenMarkup ==  null ?
        full.currentApp ?
        (
          <div key={index}>
            <div className={liClass} onClick={full.action} aria-disabled={false} id={componentId ? `${componentId}${full.label}` : ''}>
            {full.label}
              <div className={theme.currentAppIcon}>
                <Icon source={full.icon} componentColor={activeItem === full.id ? 'black' : 'white'} componentClass={theme.customIcon} theme={theme} />
              </div>
            </div>

            {childrenMarkup}
          </div>
        ) :
        (
          <div key={index}>
            <div className={liClass} onClick={full.action} aria-disabled={false} id={componentId ? `${componentId}${full.label}` : ''}>
              <Icon source={full.icon} componentColor={activeItem === full.id ? 'black' : 'white'} componentClass={theme.customIcon} theme={theme} />
              {full.label}
            </div>

            {childrenMarkup}
          </div>
        ) : <Accordion key={index} componentStyle={{ padding:'0px', height:'20px' }} mode="collapsible" items={items} theme={theme} />) :
        (
          <div key={index}>
            <div className={liClass} onClick={full.action} aria-disabled={false}>
              <Icon source={full.icon} componentColor={activeItem === full.id ? 'black' :'white'} componentClass={theme.customIcon} theme={theme} />
              {full.label}
            </div>

            {childrenMarkup}
          </div>
        );

      const singleItem = classNames(
        theme.listItem,
        activeItem === full.id && theme.active,
        full.divider && theme.divider,
        full.parentDivider && theme.parentDivider
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
        col.divider && theme.divider,
        col.parentDivider && theme.parentDividerCollapse
      );

      return (
        <div key={col.id} className={singleItem} id={componentId !== '' ? `${componentId}${col.label}` : ''}>
          <Tooltip content={col.label} preferredPosition="right" theme={theme}>
            <div className={liClass} onClick={col.action} aria-disabled={false}>
              <Icon source={col.icon} componentColor={activeItem === col.id ? 'black' : 'white'} componentClass={theme.collapseIcon} theme={theme} />
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
          <Icon source={collapseIcon} componentColor="white" componentClass={theme.customIcon}/>
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
          componentStyle={drawerStyle}
          theme={theme}>
          <DrawerContent
            componentId="fullContent"
            mode="slide"
            theme={theme}
          >
            <div className={this.props.theme.list}>
              {fullContentMarkup}
            </div>
            <div className={this.props.theme.collapseList} >
            {collapseIconMarkup}
            </div>
          </DrawerContent>

          <DrawerContent
            componentId="collapsedContent"
            mode="slide"
            theme={theme}
          >
            <div className={this.props.theme.list} >
              {collapsedContentMarkup}
            </div>
            <div className={this.props.theme.collapseList} >
            {collapseIconMarkup}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}

export default themr(SIDENAVIGATION, baseTheme)(SideNavigation) as ThemedComponentClass<Props, {}>;
