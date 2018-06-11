
import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Icon from '../Icon';
import { SIDENAVIGATION } from '../ThemeIdentifiers';
import { Drawer, DrawerContent } from '../Drawer';
import Tooltip from '../Tooltip';
import Accordion, { AccordionItemProps }from '../Accordion';
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

  render() {
    const { source, theme, accordian, drawerOpen, hideCollapse, activeItem } = this.props;
    const { icon: iconClass, collapseIcon: iconCollClass, navDiv: navClass, navDivider: divClass, li: liClass, childLi: childLiClass } = theme;
    const actDrawerId = this.state.activeDrawerId;
    // Set style for root div
    const rootElement = document.getElementById('root');

    if (rootElement !== null) {
      rootElement.className = drawerOpen ? (theme.container) : '';
      rootElement.className = rootElement.className + ' ' + (actDrawerId === 'collapsedContent' ? this.props.theme.rootCollapse : '');
    }

    // Iterate through source config items and set markup when full content is displayed
    const fullContentMarkup = source.map((full: any, index: number) => {
      const childrenMarkup = full.children !== undefined || null ? full.children.map((child: any, index: number) => {
        return (
          <li key={index}>
            <a className={childLiClass} onClick={child.action} aria-disabled={false}>
              <Icon source={child.icon} color="white" />
              {child.label}
            </a>
          </li>
        );
      }) : null;

      // Set Accordian Item properties
      const items : AccordionItemProps[] = [{
        children: childrenMarkup,
        header: <li key={index} className={liClass}><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color={activeItem === full.id ? 'black' : 'white'} />{full.label}</a></li>
      }];

      // Set markup based on the prop values
      const markup = accordian ? (childrenMarkup ==  null ?
        (
          <div key={index}>
              <li className={liClass}><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color={activeItem === full.id ? 'black' : 'white'}/>{full.label}</a></li>
              {childrenMarkup}
          </div>
        ) : <Accordion key={index} style={{ padding:'0px', height:'20px' }} mode="collapsible" items={items} />) :
        (
          <div key={index}>
              <li className={liClass}><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color={activeItem === full.id ? 'black' :'white'} />{full.label}</a></li>
              {childrenMarkup}
          </div>
        );

      const p = childrenMarkup ==  null ? 30  : ((childrenMarkup.length + 1) * 30) + 20;
      const pstyle = { paddingBottom: p + 'px' };
      const dividerMarkup = full.divider ? <div className={divClass}/> : null;
      const activeClass = activeItem === full.id ? theme.active : '';

      return (
        <div key={full.id} className={activeClass}>
            <div className={iconClass}>
                {markup}
            </div>
            <div className={navClass} style={pstyle} />
            {dividerMarkup}
        </div>
      );
    });

    // Set markup when only icons need to be shown in collapsed state
    const collapsedContentMarkup = source.map((col:any) => {
      return (
        <p key={col.id} className={iconCollClass}>
          <Tooltip content={col.label}>
            <a className={liClass} onClick={col.action} aria-disabled={false}>
                <Icon source={col.icon} color="white" />
            </a>
          </Tooltip>
        </p>
      );
    });

    const collapseIcon = actDrawerId === 'fullContent' ? 'chevronLeft' : 'chevronRight';
    const drawerContentId = actDrawerId === 'fullContent' ? 'collapsedContent' : 'fullContent';
    const collapseIconMarkup = (!hideCollapse) ?
      <span className={this.props.theme.expand}>
          <button type="button" className={this.props.theme.navButton} onClick={() => this.setState({ activeDrawerId: drawerContentId })}><Icon source={collapseIcon} color="white" /></button>
      </span>
      : null;

    // Return div with drawer component having the side navigation items wrapped in drawer content component
    return (
      <div>
        <Drawer
          active={drawerOpen}
          activeContentId={this.state.activeDrawerId}
          mode="push"
          width="small"
          style={actDrawerId === 'collapsedContent' ? { width: '10px', padding: '15px', overflow: 'visible' } : { width: '270px', overflow: 'visible'  }} >
          <DrawerContent id="fullContent" mode="slide" style={{ background: 'black', color: 'white', padding: '0px',overflowX: 'hidden' }}>
            {collapseIconMarkup}

            <ul className={this.props.theme.list}>
                {fullContentMarkup}
            </ul>
          </DrawerContent>

          <DrawerContent id="collapsedContent" mode="slide" style={{ width: '10px', padding: '15px', background: 'black', color: 'white' }}>
            {collapseIconMarkup}

            <ul className={this.props.theme.collapseList} >
              {collapsedContentMarkup}
            </ul>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}

export default themr(SIDENAVIGATION, baseTheme)(SideNavigation) as ThemedComponentClass<Props, {}>;
