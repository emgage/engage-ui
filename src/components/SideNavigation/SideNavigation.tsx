
import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Icon from '../Icon';
import { SIDENAVIGATION } from '../ThemeIdentifiers';
import { Drawer, DrawerContent } from '../Drawer';
import Tooltip from '../Tooltip';
import Accordion, { AccordionItemProps }from '../Accordion';
import * as baseTheme from './SideNavigation.scss';

export interface INavigationData {
  id?:number;
  label?:React.ReactNode;
  icon?:React.ReactNode;
  divider?:boolean | null;
  children?:React.ReactNode;
  action?(arg?:string|number|boolean|null):void | null;
}

export interface Props {
  theme?: any;
  accordian: boolean;
  activeItem?:number | null;
  source: INavigationData[];
  drawerOpen: boolean;
  hideCollapse: boolean;
  drawerExpand: boolean;
}

export interface State {
  activeDrawerId: string;
}

class SideNavigation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeDrawerId: this.props.drawerExpand ? 'fullContent' : 'collapsedContent',
    };
  }
  componentDidUpdate() {
    const bodyElement = document.body;
    if (bodyElement !== null) {
      bodyElement.className +=  this.props.drawerOpen ? ' ' + this.props.theme.container : '';
    }
  }
  render() {
    const { source, theme, accordian, drawerOpen, hideCollapse, activeItem } = this.props;
    const { icon: iconClass, collapseIcon: iconCollClass, navDiv: navClass, navDivider: divClass, li: liClass, childLi: childLiClass } = theme;
    const actDrawerId = this.state.activeDrawerId;
    const rootElement = document.getElementById('root');
    if (rootElement !== null) {
      rootElement.className = drawerOpen ? (theme.container) : '';
      rootElement.className = rootElement.className + ' ' + (actDrawerId === 'collapsedContent' ? this.props.theme.rootCollapse : '');
    }

    const fullContentMarkup = source.map((full : any) => {
      const childrenMarkup = full.children !== undefined || null ? full.children.map((child:any) => {
        return <li><a className={childLiClass} onClick={child.action} aria-disabled={false}><Icon source={child.icon} color="white" />{child.label}</a></li>;
      }) : null;
      const items : AccordionItemProps[] = [{
        children: childrenMarkup,
        header: <li className={liClass}><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color={activeItem === full.id ? 'black' : 'white'} />{full.label}</a></li>
      }
      ];
      const markup = accordian ? (
                    childrenMarkup ==  null ? (
                        <div>
                            <li className={liClass}><a className={liClass} onClick={full.action} aria-disabled={false}><Icon source={full.icon} color={activeItem === full.id ? 'black' : 'white'}/>{full.label}</a></li>
                            {childrenMarkup}
                        </div>
                    ) : (
                    <Accordion style={{ padding:'0px', height:'20px' }} mode="collapsible" items={items} />)
                    ) : (
                        <div>
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
